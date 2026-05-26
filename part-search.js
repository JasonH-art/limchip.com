(function initLimChipPartSearch() {
    if (window.__limchipPartSearchReady) return;
    window.__limchipPartSearchReady = true;

    const roots = document.querySelectorAll('#navPartSearch, .hero-part-search');
    if (!roots.length) return;

    const indexPath = window.location.pathname.includes('/part/')
        ? 'search-index.json'
        : 'part/search-index.json';
    const scriptIndexPath = window.location.pathname.includes('/part/')
        ? 'search-index.js'
        : 'part/search-index.js';
    let searchIndex = [];
    let loadingPromise = null;

    function useGlobalIndex() {
        const globalIndex = window.LIMCHIP_PART_SEARCH_INDEX;
        if (Array.isArray(globalIndex)) {
            searchIndex = globalIndex;
            return searchIndex;
        }
        return null;
    }

    function loadScriptIndex() {
        const existing = useGlobalIndex();
        if (existing) return Promise.resolve(existing);

        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = scriptIndexPath;
            script.async = true;
            script.onload = () => resolve(useGlobalIndex() || []);
            script.onerror = () => resolve([]);
            document.head.appendChild(script);
        }).then(data => {
            searchIndex = Array.isArray(data) ? data : [];
            return searchIndex;
        });
    }

    function loadIndex() {
        if (!loadingPromise) {
            const existing = useGlobalIndex();
            if (existing) return Promise.resolve(existing);

            loadingPromise = fetch(indexPath)
                .then(response => response.ok ? response.json() : [])
                .then(data => {
                    searchIndex = Array.isArray(data) ? data : [];
                    return searchIndex;
                })
                .catch(loadScriptIndex);
        }
        return loadingPromise;
    }

    function normalize(value) {
        return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    }

    function closeRoot(root) {
        root.classList.remove('is-open', 'has-results');
        const toggle = root.querySelector('.nav-search-toggle');
        const results = root.querySelector('.part-search-results, #navPartSearchResults');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (results) {
            results.innerHTML = '';
            results.style.display = 'none';
        }
    }

    function itemUrl(item) {
        const url = item.url || '';
        if (!url) return '#';
        if (url.startsWith('http')) return url;
        if (window.location.pathname.includes('/part/')) return url.replace(/^\/?part\//, '');
        return url.replace(/^\//, '');
    }

    function renderResults(root, query) {
        const results = root.querySelector('.part-search-results, #navPartSearchResults');
        if (!results) return;

        const raw = query.trim();
        const normalized = normalize(raw);
        results.innerHTML = '';

        if (normalized.length < 2) {
            root.classList.remove('has-results');
            results.style.display = 'none';
            return;
        }

        const matches = searchIndex
            .map(item => {
                const part = normalize(item.partNumber);
                const keywords = normalize(item.keywords);
                const brand = normalize(item.brand || item.manufacturer);
                const score = part === normalized ? 100 :
                    part.startsWith(normalized) ? 80 :
                    part.includes(normalized) ? 60 :
                    keywords.includes(normalized) ? 35 :
                    brand.includes(normalized) ? 20 : 0;
                return { item, score };
            })
            .filter(entry => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        if (!matches.length) {
            results.innerHTML = '<div class="nav-search-empty">No matching parts. Send an RFQ for manual sourcing.</div>';
        } else {
            results.innerHTML = matches.map(({ item }) => {
                const title = item.partNumber || 'Part number';
                const meta = [item.brand || item.manufacturer, item.category || item.productType]
                    .filter(Boolean)
                    .join(' · ');
                return [
                    `<a class="nav-search-item" href="${itemUrl(item)}">`,
                    `<strong>${title}</strong>`,
                    meta ? `<span>${meta}</span>` : '',
                    '</a>'
                ].join('');
            }).join('');
        }

        root.classList.add('has-results');
        results.style.display = 'block';
    }

    roots.forEach(root => {
        const toggle = root.querySelector('.nav-search-toggle');
        const input = root.querySelector('.part-search-input, #navPartSearchInput');
        const results = root.querySelector('.part-search-results, #navPartSearchResults');
        if (!input || !results) return;

        if (toggle) {
            toggle.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                const open = !root.classList.contains('is-open');
                document.querySelectorAll('#navPartSearch, .hero-part-search').forEach(other => {
                    if (other !== root) closeRoot(other);
                });
                document.querySelectorAll('.lang-toggle-wrapper.is-open').forEach(lang => {
                    lang.classList.remove('is-open');
                    lang.setAttribute('aria-expanded', 'false');
                });
                root.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
                if (open) {
                    window.limchipCloseMobileMenu?.();
                    loadIndex().then(() => renderResults(root, input.value));
                    setTimeout(() => input.focus(), 40);
                }
            });
        }

        input.addEventListener('focus', () => {
            root.classList.add('is-open');
            if (toggle) toggle.setAttribute('aria-expanded', 'true');
            loadIndex().then(() => renderResults(root, input.value));
        });

        input.addEventListener('input', () => {
            loadIndex().then(() => renderResults(root, input.value));
        });

        input.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeRoot(root);
        });
    });

    document.addEventListener('click', event => {
        roots.forEach(root => {
            if (!root.contains(event.target)) closeRoot(root);
        });
    });
})();
