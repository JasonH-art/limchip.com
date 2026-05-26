// Language Module - Persistent Language Switching System

class LanguageManager {

    constructor() {

        // First visit always defaults to English. Only a valid manual choice
        // stored in localStorage can override it.
        const storedLang = this.readStoredLanguage();
        this.currentLang = this.normalizeLanguage(storedLang);
        if (storedLang !== this.currentLang) {
            this.writeStoredLanguage(this.currentLang);
        }

        this.translations = {

            'zh': {
			
			    //title ==LimChip
				'page-home-title': 'LimChip 极限智芯科技 - 专业电子元器件供应商',

                // Navigation

                'nav-home': '首页',
                'nav-products': '产品中心',
                'nav-services': '供应链服务',
				'nav-applications': '行业赋能',
                'nav-about': '关于我们',
                'nav-contact': '联系我们',
                'btn-contact': '立即联系',
                'nav-search-placeholder': '搜索型号、品牌或类别...',
                'nav-search-no-result': '未找到匹配型号。',
                'nav-search-submit-rfq': '提交询价',

                

                // Footer
// ========= footer.html =========
// 标语
'footer-slogan-main': '专注领域 ◆ 驱动未来',
'footer-slogan-sub': '创造价值 品质为先 服务至上',

// 快速链接标题
'footer-quick-links': '快速链接',

// 联系我们标题
'footer-contact-title': '与我们联系',

// 联系信息标签
'footer-contact-phone-fixed': '座机：',
'footer-contact-phone-mobile': '手机：',
'footer-contact-email': '邮箱：',
'footer-contact-wechat': '微信：',
'footer-contact-qq': 'QQ：',
"footer-contact-address": "总部：",
"footer-contact-address-val": "中国 ● 香港",


// 底部版权
'footer-bottom-copyright': '© 2026 ◈ 极限智芯（深圳）科技有限公司 | LIMCHIP CO. LTD. ◈ 版权所有',

                
// =========index ========
// Hero
'hero-title-all': '连接全球芯脉',
'hero-subtitle': '驱动智能未来',
'hero-description': '极限智芯（LimChip）专注致力于为全球客户提供高质量的电子元器件产品和优质的供应链服务。',
'hero-btn-more': '了解更多',
// About
'about-year': '始于 2016',
'about-title-sub': '专业的',
'about-title-main': '电子元器件<span class="text-accent">供应商</span>',
'about-desc-primary': '<strong>极限智芯（LimChip）</strong>致力于为全球电子制造企业提供卓越的电子元器件供应解决方案。',
'about-desc-sub': '依托纵深全球的战略渠道与精密数字化管控，我们赋予客户打通原型研发至大规模量产的全生命周期采购能力。凭借卓越的货源组织力，我们系统性破解电子元器件供应瓶颈，为客户构建起稳健、高效且极具竞争力的芯片供应链支撑体系。',
'about-btn-us': '了解我们',
// Stats
'stat-clients-p': '超过',
'stat-clients-l': '服务客户',
'stat-exp-s': 'Y',
'stat-exp-l': '行业经验',
'stat-brands-l': '合作品牌',
'stat-response-s': 'H',
'stat-response-l': '极速响应',
// Core Values
'values-title': '核心优势',
'values-subtitle': '全方位的供应链保障体系',
'values-card-1-t': '品质保障',
'values-card-1-d': '原厂渠道直供，全批次追溯，确保零缺陷交付。',
'values-card-2-t': '快速响应',
'values-card-2-d': 'FAE技术团队待命，24小时内提供完整选型方案。',
'values-card-3-t': '全球采购',
'values-card-3-d': '覆盖欧美日韩渠道，解决紧缺料与长尾料采购难题。',
'values-stat-1': '产品型号 Part#',
'values-stat-2': '高标准质量体系',
'values-stat-3': '数字化供应链管理',
// Products
'prod-cat-tag': 'PRODUCT CATEGORY',
'prod-cat-title': '产品类型',
'prod-cat-subtitle': '多维度覆盖电子元器件核心领域',
'prod-cat-1-t': '集成电路 (IC)',
'prod-cat-1-d': '高性能数字芯片、模拟芯片及电源管理 IC。',
'prod-cat-2-t': '功率器件',
'prod-cat-2-d': 'IGBT、MOSFET 及第三代半导体 SiC/GaN。',
'prod-cat-3-t': '存储器件',
'prod-cat-3-d': '涵盖 DRAM、NAND Flash、SRAM 及各类工业级存储方案。',
'prod-cat-4-t': '连接器',
'prod-cat-4-d': '高可靠性板对板、线对板连接器及各类工业标准接口。',
'prod-cat-5-t': '被动元器件',
'prod-cat-5-d': '高可靠性电容、精密电阻及电感，保障系统稳定。',
'btn-more-detail': '更多详情',
// Brands & Industry
'brand-title': '产品线品牌',
'btn-more': '更多',
'ind-title': '行业解决方案',
'ind-card-1-t': '汽车电子',
'ind-card-1-d': '车规级 BMS、智能座舱及 ADAS 系统元器件支持。',
'ind-card-2-t': '工业控制',
'ind-card-2-d': '智慧工厂、机器人、高性能 PLC、变频器及伺服驱动系统方案。',
'ind-card-3-t': '通信设备',
'ind-card-3-d': '5G 基站及物联网射频前端、光通信芯片。',
'ind-card-4-t': '医疗电子',
'ind-card-4-d': '高精度成像系统、便携式诊断设备及监护仪。',
'ind-card-5-t': '新消费电子',
'ind-card-5-d': '智能穿戴、无人机、智能家居。',
'ind-card-6-t': '新能源',
'ind-card-6-d': '光伏逆变器、储能系统及充电桩核心功率器件。',
'btn-ind-detail': '了解行业赋能详情',
// Flow
'flow-title': '标准化服务流程',
'flow-step-1-t': '需求调研',
'flow-step-1-d': '深度沟通应用场景，精准匹配型号需求与技术参数。',
'flow-step-2-t': '方案验证',
'flow-step-2-d': '提供样品支持与技术方案评估，确保元器件完美适配。',
'flow-step-3-t': '物流交付',
'flow-step-3-d': '全球供应链协同，原装正品顺丰直达，保障时效。',
'flow-step-4-t': '售后支持',
'flow-step-4-d': '24小时技术在线，提供长期的品质保障与供应链优化。',
// CTA
'cta-tag': 'READY TO START?',
'cta-title': '获得高效的芯片供应链服务',
'cta-desc': '无论是紧缺物料寻源，还是长期成本优化方案，我们的专家团队随时待命。',
'cta-btn-submit': '@提交需求',
'cta-btn-contact': '联系支持',
'cta-note-1': '专业快速响应',
'cta-note-2': '原装正品保障',

// 页面标题
'page-products-title': '产品中心 - 极限智芯科技有限公司',

// Hero
'products-hero-title': '产品中心',
'products-hero-subtitle': '混合分销 ⧈ 渠道多样 ⧈ 丰富产品',

// 产品分类
'products-section-categories': '产品类型',
'products-section-subtitle1': '全线覆盖电子元器件',
'products-section-subtitle2': '为您的供应链提供一站式支持',

// 公共
'prod-including': '包含品类：',

// 产品卡片 - 微控制器与处理器
'prod-mcu-title': '微控制器与处理器',
'prod-mcu-subtitle': 'Microcontrollers & Processors',
'prod-mcu-tag1': '汽车电子 BMS 电池管理系统',
'prod-mcu-tag2': 'PLC / 工业人机界面 (HMI)',
'prod-mcu-tag3': 'AI算力&机器人',
'prod-mcu-tag4': '光伏串式逆变器控制',
'prod-mcu-tag5': '主控制板卡',
'prod-mcu-tag6': '通信基站&边缘通信网关',
'prod-mcu-tag7': '高可靠性医疗监护仪',
'prod-mcu-desc': '高性能 32 位双核 MCU、超低功耗 MSP 系列单片机、工业级异构多核处理器 (MPU)、SoC 系统级计算芯片、专用数字信号处理器 (DSP)、Arm 微控制器、车规级MCU；各类CPU处理器 。',
'prod-mcu-spec1-label': '核心架构',
'prod-mcu-spec2-label': '计算性能',
'prod-mcu-spec3-label': '集成外设',
'prod-mcu-tag': '运算核心',

// 产品卡片 - 专用芯片 (ASIC/FPGA)
'prod-asicfpga-title': '专用芯片 (ASIC/FPGA)',
'prod-asicfpga-subtitle': 'Custom ICs & Programmable Logic',
'prod-asicfpga-tag1': '5G 基站波束成形',
'prod-asicfpga-tag2': '边缘 AI 视觉处理',
'prod-asicfpga-tag3': '高频交易 (HFT) 加速',
'prod-asicfpga-tag4': '4K/8K 视频编解码',
'prod-asicfpga-tag5': '工业机器人运动控制',
'prod-asicfpga-tag6': '航天与防务模拟原型',
'prod-asicfpga-tag7': '医疗影像实时增强',
'prod-asicfpga-desc': '现场可编程逻辑门阵列 (FPGA)、系统级嵌入式 SoC FPGA、复杂可编程逻辑器件 (CPLD)、模块系统 (SoM/SOM)、定制化 ASIC 方案、高性能 FPGA 加速卡及配套开发评估套件。',
'prod-asicfpga-spec1-label': '核心特性',
'prod-asicfpga-spec2-label': '加速能力',
'prod-asicfpga-spec3-label': '硬件接口',
'prod-asicfpga-tag': '可编程逻辑',

// 产品卡片 - 存储芯片
'prod-memory-title': '存储芯片',
'prod-memory-subtitle': 'Memory & Data Storage',
'prod-memory-tag1': '高性能 DDR5/LPDDR5X',
'prod-memory-tag2': '汽车系统大容量和高可靠存储',
'prod-memory-tag3': '工业控制器嵌入式 eMMC 方案',
'prod-memory-tag4': '人工智能大模型 HBM 高带宽存储',
'prod-memory-tag5': '固态硬盘 (SSD) 核心控制器与颗粒',
'prod-memory-tag6': '低功耗 IoT 设备 SPI Nor Flash',
'prod-memory-tag7': '工业 PLC 与 HMI 嵌入式闪存方案',
'prod-memory-desc': '动态随机存取存储器 (DRAM)、NAND Flash 闪存、串行/并行 Nor Flash、嵌入式多媒体存储卡 (eMMC)、通用闪存存储 (UFS)、非易失性存储 (EEPROM)、以及高可靠性车规级与工业级存储模块。',
'prod-memory-spec1-label': '存取带宽',
'prod-memory-spec2-label': '可靠性',
'prod-memory-spec3-label': '工作温度',
'prod-memory-tag': '数据底座',

// 产品卡片 - 电源 PowerIC
'prod-poweric-title': '电源 PowerIC',
'prod-poweric-subtitle': 'Advanced Power Management',
'prod-poweric-tag1': '汽车动力电池管理系统 (BMS)',
'prod-poweric-tag2': '自适应远光灯 (ADB) 矩阵控制',
'prod-poweric-tag3': 'FPGA & 算力处理器核心供电',
'prod-poweric-tag4': '48V 轻混与高压 DC-DC 转换',
'prod-poweric-tag5': '氮化镓 (GaN) 极速快充与谐振电源',
'prod-poweric-tag6': '工业机器人多路驱动与保护',
'prod-poweric-desc': '高集成 PMIC、SBC 系统基础芯片、多电芯监控与平衡 IC、高速栅极驱动器、智能功率模块 (IPM)、高效能 MOSFET/IGBT、LED 驱动及第三代半导体 (GaN/SiC) 功率器件。',
'prod-poweric-spec1-label': '转换效能',
'prod-poweric-spec2-label': '瞬态响应',
'prod-poweric-spec3-label': '功率密度',
'prod-poweric-tag': '核心动力',

// 产品卡片 - 传感器
'prod-sensor-title': '传感器',
'prod-sensor-subtitle': 'Comprehensive Sensing Solutions',
'prod-sensor-tag1': '高像素 CMOS 图像识别与视觉系统',
'prod-sensor-tag2': 'MEMS 惯性测量单元 (IMU) 导航',
'prod-sensor-tag3': '工业级高精度温湿度监控网络',
'prod-sensor-tag4': '毫米波雷达 (Radar) 避障与探测',
'prod-sensor-tag5': '转向及节气门磁性位置感测',
'prod-sensor-tag6': '环境空气质量 (VOC) 与压力感测',
'prod-sensor-desc': 'CMOS 图像传感器 (CIS)、MEMS 压力与加速度计、温湿度传感器芯片、磁性开关与位置传感器、毫米波雷达 SoC、硅基麦克风、气体/水质感测模块及 3D ToF 测距芯片。',
'prod-sensor-spec1-label': '感知维度',
'prod-sensor-spec2-label': '测量精度',
'prod-sensor-spec3-label': '集成方案',
'prod-sensor-tag': '感知前端',

// 产品卡片 - 车规级专用芯片
'prod-automotive-title': '车规级专用芯片',
'prod-automotive-subtitle': 'Automotive Qualified ICs',
'prod-automotive-tag1': '自动驾驶 (ADAS) 域控制器 SoC',
'prod-automotive-tag2': '新能源动力总成 (VVCU) 核心控制',
'prod-automotive-tag3': '线控底盘 (转向/制动) 安全驱动',
'prod-automotive-tag4': '车载高速骨干网 (Ethernet/CAN-XL)',
'prod-automotive-tag5': '智能座舱 SoC 与高算力芯片供电',
'prod-automotive-tag6': '功能安全级监控与看门狗芯片',
'prod-automotive-desc': '符合 AEC-Q100 标准的微控制器 (MCU)、系统基础芯片 (SBC)、车规级 ASIC、车载以太网收发器、功能安全电源管理芯片、及满足高等级 ASIL 标准的感知与驱动 IC。',
'prod-automotive-spec1-label': '功能安全',
'prod-automotive-spec2-label': '可靠性等级',
'prod-automotive-spec3-label': '生命周期',
'prod-automotive-tag': '车载核心',

// 产品卡片 - 数据转换器 (ADC/DAC)
'prod-adcdac-title': '数据转换器 (ADC/DAC)',
'prod-adcdac-subtitle': 'Data Converters & AFE',
'prod-adcdac-tag1': '5G 基站射频收发 (RF Transceiver)',
'prod-adcdac-tag2': '高端医疗影像 (CT/MRI) 模拟前端',
'prod-adcdac-tag3': '工业自动化数字电位器控制',
'prod-adcdac-tag4': '光学监控 CCD/CIS 成像信号链',
'prod-adcdac-tag5': '高带宽示波器高速采样系统',
'prod-adcdac-tag6': '航空航天级精密电压基准转换',
'prod-adcdac-desc': '模数转换器 (ADC)、数模转换器 (DAC)、射频收发器 (RFIC)、精密与高速转换核心、数字电位器、隔离式 ADC、医疗模拟前端 (AFE) 及集成型精密数据采集系统。',
'prod-adcdac-spec1-label': '转换速度',
'prod-adcdac-spec2-label': '转换精度',
'prod-adcdac-spec3-label': '集成特性',
'prod-adcdac-tag': '模数边界',

// 产品卡片 - 接口芯片
'prod-interface-title': '接口芯片',
'prod-interface-subtitle': 'Interface & Connectivity',
'prod-interface-tag1': '车载高速串行器/解串器 (SerDes)',
'prod-interface-tag2': '工业 4.0 自动化 IO-Link 互联',
'prod-interface-tag3': '高性能视频传输 (HDMI/DisplayPort)',
'prod-interface-tag4': '超高速数据中心 PCIe/SATA/SAS 链路',
'prod-interface-tag5': 'USB Type-C 与电力传输 (PD) 系统',
'prod-interface-tag6': '长距离 RS-485/422 工业抗干扰通信',
'prod-interface-desc': 'CAN/LIN 收发器、RS-232/485 多协议 IC、以太网 PHY、高速视频接口 (MIPI/LVDS)、I2C/SPI 开关与电平转换、USB 控制器、高速串行器 (FPD-Link/V3Link) 及系统基础芯片 (SBC)。',
'prod-interface-spec1-label': '传输带宽',
'prod-interface-spec2-label': '协议兼容',
'prod-interface-spec3-label': '信号完整性',
'prod-interface-tag': '互联互通',

// 产品卡片 - 射频、微波与毫米波
'prod-rf-title': '射频、微波与毫米波',
'prod-rf-subtitle': 'RF, Microwave & Millimeter Wave',
'prod-rf-tag1': '航空航天与防务 (ADEF) 雷达系统',
'prod-rf-tag2': '5G/6G 通信基站与软件定义无线电 (SDR)',
'prod-rf-tag3': '卫星通信 (Satcom) 波束成形阵列',
'prod-rf-tag4': '100GHz+ 超高频测试与测量仪器',
'prod-rf-tag5': '电子战 (EW) 与宽带信号干扰',
'prod-rf-tag6': '工业自动化机器人与毫米波感测',
'prod-rf-desc': 'PLL 频率合成器、RF ADC/DAC、混合信号前端 (MxFE®)、高功率 GaN 放大器、射频开关/混频器/衰减器、多通道波束成形器、电压频率转换器 (VFC) 及 VCO 振荡器。',
'prod-rf-spec1-label': '频谱覆盖',
'prod-rf-spec2-label': '集成技术',
'prod-rf-spec3-label': '制造工艺',
'prod-rf-tag': '天线到比特',

// 产品卡片 - 分立器件与功率半导体
'prod-discrete-title': '分立器件与功率半导体',
'prod-discrete-subtitle': 'Power Discretes, MOSFET & IGBT',
'prod-discrete-tag1': '新能源汽车牵引逆变器 (Inverter)',
'prod-discrete-tag2': '工业机器人伺服驱动与电机控制',
'prod-discrete-tag3': '光伏发电与风能储能 (ESS) 转换',
'prod-discrete-tag4': '数据中心高功率密度电源模块',
'prod-discrete-tag5': '轨道交通高压电力牵引系统',
'prod-discrete-tag6': '消费电子 PD 快充与家电变频控制',
'prod-discrete-desc': '高效能功率 MOSFET、IGBT 单管及模块、碳化硅 (SiC) / 氮化镓 (GaN) 功率器件、智能功率模块 (IPM)、整流二极管、晶闸管、ESD 保护器件及小信号三极管。',
'prod-discrete-spec1-label': '耐压等级',
'prod-discrete-spec2-label': '开关性能',
'prod-discrete-spec3-label': '封装散热',
'prod-discrete-tag': '功率基石',

// 产品卡片 - 连接器
'prod-connector-title': '连接器',
'prod-connector-subtitle': 'Connectors & Interconnects',
'prod-connector-tag1': '新能源汽车高压大电流连接 (HV)',
'prod-connector-tag2': '车载高速以太网与 FAKRA 射频连接',
'prod-connector-tag3': '工业机器人高柔性伺服电机接口',
'prod-connector-tag4': '数据中心 112G/224G 高速背板连接',
'prod-connector-tag5': '航空航天级防腐蚀圆形电连接器',
'prod-connector-tag6': '医疗级高插拔寿命精密接口',
'prod-connector-desc': '板对板 (BTB) 连接器、线对板连接器、高速背板连接器、圆形/矩形工业连接器、车载高压互锁 (HVIL) 插件、RF 同轴连接器、光纤连接器及定制化线束组件。',
'prod-connector-spec1-label': '电气性能',
'prod-connector-spec2-label': '信号速率',
'prod-connector-spec3-label': '环境防护',
'prod-connector-tag': '稳固互联',

// 产品卡片 - 开发工具与生态
'prod-devtools-title': '开发工具与生态',
'prod-devtools-subtitle': 'Development Tools & Ecosystem',
'prod-devtools-tag1': 'AURIX™ & S32 核心评估套件',
'prod-devtools-tag2': 'MATLAB / Simulink 模型化开发',
'prod-devtools-tag3': '边缘计算 AI 算法快速部署',
'prod-devtools-tag4': '功能安全 (ISO 26262) 验证工具',
'prod-devtools-tag5': '数字孪生与在线系统仿真',
'prod-devtools-tag6': '无线射频 (SDR) 设计与验证平台',
'prod-devtools-desc': '评估板 (EVB) 与设计套件、集成开发环境 (IDE)、硬件仿真器、嵌入式软件库 (SDK)、配置工具 (Configurator)、在线交互式仿真器及开发者社区支持。',
'prod-devtools-spec1-label': '开发加速',
'prod-devtools-spec2-label': '兼容性',
'prod-devtools-spec3-label': '设计资源',
'prod-devtools-tag': '研发赋能',
// 产品卡片 - spec-value 值（12个卡片，每个3项，共36项）
// 微控制器与处理器
'prod-mcu-spec1-value': 'Arm® / RISC-V / DSP 混合架构',
'prod-mcu-spec2-value': 'Ultra-Low Power 至 2.0GHz+',
'prod-mcu-spec3-value': '16-bit ADC / CAN-FD / PWM',

// 专用芯片 (ASIC/FPGA)
'prod-asicfpga-spec1-value': '低延迟并行处理 / 动态配置',
'prod-asicfpga-spec2-value': '集成 AI 引擎 / 硬核 DSP 单元',
'prod-asicfpga-spec3-value': '高速收发器 / PCIe Gen5 / DDR5',

// 存储芯片
'prod-memory-spec1-value': '高达 8.5Gbps+ / 支持多通道并行',
'prod-memory-spec2-value': 'ECC 纠错引擎 / 10万次+ 擦写寿命',
'prod-memory-spec3-value': '满足 -40°C 至 125°C 严苛环境',

// 电源 PowerIC
'prod-poweric-spec1-value': '最高 99% 峰值效率 / 极低静态功耗',
'prod-poweric-spec2-value': '极速电压调节 (VTT/Core) / 零过冲控制',
'prod-poweric-spec3-value': '高频 GaN 架构 / 极致小型化系统封装',

// 传感器
'prod-sensor-spec1-value': '视觉、运动、环境、位置全息感测',
'prod-sensor-spec2-value': '±0.1°C 温控精度 / 亚微米级位移',
'prod-sensor-spec3-value': '多传感器融合模块 (IMU+GNSS+)',

// 车规级专用芯片
'prod-automotive-spec1-value': '全面符合 ISO 26262 ASIL-B/D 认证',
'prod-automotive-spec2-value': 'AEC-Q100 Grade 0/1 (-40°C~150°C)',
'prod-automotive-spec3-value': '15年+ 长期供货保障 / 零缺陷质量管理',

// 数据转换器 (ADC/DAC)
'prod-adcdac-spec1-value': 'GSPS 级超高速采样 / 高带宽支持',
'prod-adcdac-spec2-value': '24-bit+ 极致分辨率 / 纳伏级噪声下限',
'prod-adcdac-spec3-value': '内置隔离保护 / 集成数字化滤波引擎',

// 接口芯片
'prod-interface-spec1-value': '支持超高速 16Gbps+ / 4K/8K 视频链路',
'prod-interface-spec2-value': '全协议覆盖 (CAN-FD / USB4 / PCIe Gen5)',
'prod-interface-spec3-value': '集成重定时器 (Retimer) 与先进 ESD 防护',

// 射频、微波与毫米波
'prod-rf-spec1-value': '从 DC 至 100 GHz+ 全频段覆盖',
'prod-rf-spec2-value': '集成数字信号处理 (DSP) 的 MxFE® 方案',
'prod-rf-spec3-value': '先进 GaN / GaAs / SiGe / SOI 工艺',

// 分立器件与功率半导体
'prod-discrete-spec1-value': '从 20V 低压至 6500V+ 超高压覆盖',
'prod-discrete-spec2-value': '极低导通电阻 (Rds(on)) / 超快切换速度',
'prod-discrete-spec3-value': '先进双面散热封装 / 高可靠性压力接触模块',

// 连接器
'prod-connector-spec1-value': '低接触电阻 / 支持 1000V+ 高压绝缘',
'prod-connector-spec2-value': '支持 PAM4 技术 / 极低插入损耗',
'prod-connector-spec3-value': 'IP68/IP69K 防水等级 / 抗高频振动',

// 开发工具与生态
'prod-devtools-spec1-value': '图形化配置 / 自动化代码生成',
'prod-devtools-spec2-value': '支持主流第三方编译器 (IAR/Keil)',
'prod-devtools-spec3-value': '丰富的参考设计 (Reference Design)',


// 品牌区域
'brand-main-title': '产品品牌',
'brand-global-badge': 'Global',
'brand-global-name': '国际品牌',
'brand-global-desc': '世界知名半导体品牌芯片产品，专注原厂渠道，建立长期稳定的战略合作关系。',
'brand-global-ti-desc': '模拟芯片 电源芯片',
'brand-global-st-desc': '微控制器 传感器',
'brand-global-infineon-desc': '功率器件 车规芯片',
'brand-global-adi-desc': '数据转换 射频芯片',
'brand-global-nxp-desc': '车载MCU 接口芯片',
'brand-global-altera-desc': 'FPGA CPLD器件',
'brand-global-xilinx-desc': 'FPGA SOC',
'brand-global-sk-desc': '存储芯片 DRAM',
'brand-global-samsung-desc': '存储器 闪存芯片',
'brand-global-micron-desc': '存储芯片 DDR eMMC',
'brand-global-nvidia-desc': 'GPU AI计算显存',
'brand-global-amd-desc': 'CPU 计算平台',
'brand-global-intel-desc': 'CPU 网卡芯片',
'brand-global-microchip-desc': 'MCU 模拟器件',
'brand-global-mps-desc': '电源管理',
'brand-global-nexperia-desc': '分立器件 逻辑芯片',
'brand-global-onsemi-desc': 'MOSFET 驱动芯片',
'brand-global-broadcom-desc': '网络通信 射频连接',
'brand-global-realtek-desc': '声卡网卡 控制芯片',
'brand-global-vicor-desc': '高密度 电源模块',

'brand-domestic-badge': 'Domestic Innovation',
'brand-domestic-name': '国产品牌',
'brand-domestic-desc': '深耕国产芯片供应链，助力中国芯崛起，提供高性价比的国产替代方案。',
'brand-domestic-hisilicon-desc': '海思半导体',
'brand-domestic-gigadevice-desc': '兆易创新',
'brand-domestic-sgmicro-desc': '圣邦微电子',
'brand-domestic-rockchip-desc': '瑞芯微',
'brand-domestic-longsys-desc': '江波龙存储',
'brand-domestic-allwinner-desc': '全志科技',
'brand-domestic-pango-desc': '紫光同创FPGA',
'brand-domestic-yangjie-desc': '扬杰电子',
'brand-domestic-unisoc-desc': '紫光展锐',
'brand-domestic-3peak-desc': '思瑞浦模拟',
'brand-domestic-nuvoton-desc': '新唐科技',
'brand-domestic-mediatek-desc': '联发科 MTK',
'brand-domestic-macronix-desc': '旺宏電子',
'brand-domestic-nanya-desc': '南亚科技',
'brand-domestic-winbond-desc': '华邦电子',

'brand-scroller-title': 'PRODUCT BRAND',

// 质量管控
'quality-title': '严苛的质量管控体系',
'quality-subtitle': '三级深度检测流程，确保每一颗交付给客户的芯片均为 100% 原装正品',
'quality-step-1': 'Step 01',
'quality-step1-node1': 'Label核对',
'quality-step1-node2': '丝印比对',
'quality-step1-node3': '显微镜检',
'quality-step1-title': '外观及包装检查',
'quality-step1-desc': '严格核对原厂 Label、批次号，并在高清显微镜下进行丝印比对。',
'quality-step-2': 'Step 02',
'quality-step2-node1': 'X-Ray扫描',
'quality-step2-node2': '开盖验证',
'quality-step2-node3': '晶圆量测',
'quality-step2-title': '实验室深度验证',
'quality-step2-desc': '进行 X-Ray 内部扫描、开盖 (Decap) 检查晶圆尺寸。',
'quality-step-3': 'Step 03',
'quality-step3-node1': '恒温恒湿',
'quality-step3-node2': 'ESD防护',
'quality-step3-node3': '真空包装',
'quality-step3-title': '仓储与物流防护',
'quality-step3-desc': '24H 恒温恒湿仓库存储，执行原厂级 ESD 防静电标准。',

// BOM
'bom-title-line1': 'BOM',
'bom-title-line2': '快速配单服务',
'bom-subtitle': '只需上传您的物料清单，资深采购工程师将在 2 小时内为您提供方案。',
'bom-item1': '全球 5000+ 供应商实时库存比价',
'bom-item2': '停产型号 (EOL) 及紧缺料替代建议',
'bom-item3': '数字化供应链追踪，降低综合采购成本',
'bom-upload-title': '立即提交询价清单',
'bom-btn': '立即发送 BOM',
'bom-formats': '支持 .xlsx / .pdf / .csv 格式',

// 网络
'network-title-main': 'GLOBAL LOGISTICS',
'network-title-sub': 'SUPPLY CHAIN NETWORK',
'network-card-title': '全球货源 · 极速交付',
'network-item1-title': '全球服务网络',
'network-item1-desc': '以深圳、香港、新加坡均据点，辐射全球客户； 设立现代化常备现货仓库，核心城市最快可实现 24 小时极速交付。',
'network-item2-title': '欧美原厂渠道',
'network-item2-desc': '深耕行业，链动全球。依托 300+ 欧美原厂品牌网络，以渠道核心竞争力，保障紧缺货源的优先配给。',
'network-stat1-label': '覆盖国家',
'network-stat2-label': '询价响应',
'network-stat3-label': '原装正品',

// ========= services.html =========
// 页面标题
'page-services-title': '供应链服务 - LimChip 极限智芯科技',

// Hero
'services-hero-title': '供应链服务',
'services-hero-subtitle': '品质保证 ◘ 客户至上',

// 品质保障
'services-qc-main-title': '品质和保障',
'services-qc-subtitle': '完善的检测流程，严苛的系统管理，为打造零风险的元器件供应环境',
"services-qc-title-1": "零缺陷品质",
"services-qc-title-2": "全流程实验室体系",
'services-qc-desc': '我们拥有自己一套严苛的供应商准入与物料复检体系。我们不仅提供芯片，更通过多维度的物理与电气性能测试，为您屏蔽一切潜在的供应链风险。',
'qc-step1-h': '外观一致性检测',
'qc-step1-p': '基于高倍显微镜的丝印、封装及原厂标签验证，识破二次翻新。',
'qc-step2-h': 'X-Ray 结构探测',
'qc-step2-p': '核对框架、引线框架及晶圆尺寸一致性，排除空包与虚假芯片。',
'qc-step3-h': 'Decap 开盖分析',
'qc-step3-p': '物理剥离封装，对比芯片内部 Die 标识与原厂数据库的一致性。',
'qc-step4-h': '电性能及失效应力',
'qc-step4-p': '在不同温度环境下验证参数指标，确保长期运行的稳定性。',
'qc-track-check': '检测覆盖率',
'qc-track-origin': '原厂可追溯',
'qc-track-standard': '入库验证标准',
'qc-track-service': '质量保障体系',

// 全球供应链渠道
'services-gsc-primary-title': '全球供应链渠道',
'services-gsc-secondary-title': '全球紧缺芯片 现货对冲交付方案',
'services-gsc-desc': '整合OEM工厂带料、原厂及代理商渠道，以及客户/同行调货库存，实时匹配紧缺料件，实现可落地交付，保障生产线持续运转。',
'services-gsc-core-scope': 'CORE SCOPE',
'services-gsc-item1': 'CPU / MCU / MPU / DSP',
'services-gsc-item2': 'FPGA / CPLD',
'services-gsc-item3': 'Power ICs / IGBT / SiC / GaN / PMIC',
'services-gsc-item4': 'Analog & Signal Chain (ADC / DAC / Op-Amp / PGA / Interface IC)',
'services-gsc-item5': 'DDR / SRAM / NAND / NOR / EEPROM',
'services-gsc-item6': 'RF / Wireless Modules / Ethernet',
'services-gsc-item7': 'Sensors / TVS / ESD / Protection',
'services-gsc-item8': 'Clock & Timing',
'services-gsc-item9': 'Switches & Multiplexers',
'services-gsc-item10': 'Interfaces & Isolation',
'services-gsc-item11': 'Security & Authentication',

// 三张卡片
'services-card1-title': '多渠道现货库存对冲',
'services-card1-desc': '直连全球授权代理与 OEM/EMS 备料池，跨地域对冲调度，精准切入供应断点。',
'services-card2-title': '7×24h 极速响应交付',
'services-card2-desc': '全球滚动报价体系，数小时内反馈真实库存。支持自营仓当日直发，缩减风险窗口。',
'services-card3-title': '全流程质量合规防线',
'services-card3-desc': '严格执行来料分级检测与第三方权威复检，提供完整贸易单据，确保交付绝对合规。',

// 核心服务（部分键已存在，补充完整）
'services-section-services': '核心服务',
'services-section-services-desc': '一站式电子元器件供应链服务',
'services-service1-title': '全球采购',
'services-service1-desc': '覆盖全球采购网络，确保供应链稳定可靠',
'services-service2-title': '品质检测',
'services-service2-desc': '严格品质检测流程，符合最高质量标准',
'services-service3-title': '仓储物流',
'services-service3-desc': '现代化仓储和高效物流，确保及时交付',
'services-service4-title': '技术支持',
'services-service4-desc': '专业团队提供全方位技术咨询服务',

// 服务流程
'services-section-process': '服务流程',
'services-section-process-desc': '标准化流程，确保服务质量',
'services-step1-title': '需求确认',
'services-step1-desc': '详细了解客户需求',
'services-step2-title': '方案制定',
'services-step2-desc': '制定最优解决方案',
'services-step3-title': '采购执行',
'services-step3-desc': '全球采购优质产品',
'services-step4-title': '品质检测',
'services-step4-desc': '严格质量检测',
'services-step5-title': '交付服务',
'services-step5-desc': '及时安全交付',

// 服务优势
'services-section-advantages': '服务优势',
'services-section-advantages-desc': '选择我们的理由',
'services-advantage1-title': '专业团队',
'services-advantage1-desc': '拥有多年行业经验的专业团队，深入了解客户需求，提供定制化解决方案。我们不仅提供产品，更提供专业的技术支持和咨询服务。',
'services-advantage2-title': '品质保证',
'services-advantage2-desc': '严格的质量控制体系，所有产品均来自原厂或授权代理商，确保100%正品。多重检测流程，确保产品质量符合最高标准。',
'services-advantage3-title': '快速响应',
'services-advantage3-desc': '24小时内响应客户需求，快速报价，及时交付。灵活的供应链体系，能够应对各种紧急需求，确保项目进度。',
'services-advantage4-title': '成本优化',
'services-advantage4-desc': '全球化的采购网络，为客户寻找最优价格。大批量采购优势，为客户提供具有竞争力的价格，降低采购成本。',

// ========= applications.html =========
// 页面标题
'page-apps-title': '行业赋能 - LimChip 极限智芯科技',

// Hero
'apps-hero-title': '行业赋能',
'apps-hero-subtitle': '深耕行业 ➽ 创造价值',

// 应用领域
'apps-section-title': '应用领域',
'apps-section-subtitle1': '深耕全球半导体黄金赛道',
'apps-section-subtitle2': '精准赋能高价值应用场景',

// 应用卡片（8个）
'app-card1-title': '汽车电子',
'app-card1-desc': '智能驾驶 (ADAS)、域控制器、三电系统、底盘安全与动力总成、车载环视系统、LED车灯控制，车内智能照明、信息娱乐仪表组。',
'app-card2-title': '人工智能与AI算力',
'app-card2-desc': 'AI 加速卡、数据中心服务器、高性能算力中心、边缘计算网关、HBM 存储阵列、NPU、液冷算力集群、云端训练芯片。',
'app-card3-title': '电力与能源',
'app-card3-desc': '光伏逆变器、风机主控板、超级充电桩、UPS、储能BMS电池管理系统、数字电源模组、智慧电网终端、电力专用光模块。',
'app-card4-title': '工业电子',
'app-card4-desc': '电机驱动控制器、PLC控制器、工业PC、数据采集模块、嵌入式控制主板、工业显示器、精密检测仪器、工业以太网、激光测距模块、机器视觉相机。',
'app-card5-title': '通信电子',
'app-card5-desc': '宏基站、微基站、光传输网络设备、光模块、路由器、卫星通讯终端、基站射频模块、交换机、工业物联网网关、边缘接入点。',
'app-card6-title': '医疗电子',
'app-card6-desc': '数字化超声影像、监护仪、AED除颤仪、高精度分析仪、超声诊断仪、手术机器人、可穿戴医疗设备、图像处理主板、高速 ADC 采集板、核磁共振模组。',
'app-card7-title': '特种领域',
'app-card7-desc': '抗辐射航天载荷、宽温域工业控制器、高可靠信号链路、机载通信、雷达信号处理、加固嵌入式计算机、高精度导航模组、极端环境电源。',
'app-card8-title': '新消费电子',
'app-card8-desc': '智能可穿戴设备、运动相机、便携户外储能电源、AI 陪伴机器人、AR/VR 头显、智能家居、无人机、游戏主机控制器、智能感知模组。',

// 解决方案
'sol-section-title': '解决方案',
'sol-section-subtitle1': '全链路技术闭环架构',
'sol-section-subtitle2': '驱动数字化转型落地',

// 方案1 - 汽车照明
'sol1-badge': 'AUTOMOTIVE LIGHTING',
'sol1-subtitle': 'LITIX™ 驱动与智能像素控制技术',
'sol1-category': 'Intelligence & Safety',
'sol1-title': '智慧汽车 LED 照明系统',
'sol1-desc': '通过高精度驱动技术，赋予道路照明以“情感”与“交互”。我们的方案不仅提升了夜间行驶安全性，更通过自适应像素控制重新定义了外观语言。',
'sol1-feature1-title': '自适应像素控制',
'sol1-feature1-desc': '实现动态光矩阵控制。',
'sol1-feature2-title': '高能效驱动架构',
'sol1-feature2-desc': 'LITIX™ Power 系列极致效率。',
'sol1-feature3-title': '可靠供电组合',
'sol1-feature3-desc': '汽车级 MOSFET 稳定工作。',
'sol1-feature4-title': '高度集成化设计',
'sol1-feature4-desc': '显著优化 PCB 空间。',
'sol1-footer-label': '核心价值：',
'sol1-footer-value': '满足 AEC-Q100 标准，支持前装大灯及氛围照明。',

// 方案2 - 工业边缘计算
'sol2-badge': 'INDUSTRIAL AI',
'sol2-subtitle': '边缘计算驱动的工业 4.0 闭环',
'sol2-category': 'Smart Manufacturing',
'sol2-title': '工业感知与边缘计算中心',
'sol2-desc': '打破传统传感器的边界，将 AI 算法下沉至生产现场。实现毫秒级的实时异常检测与预测性维护，确保生产线无间断运行。',
'sol2-feature1-title': '低延迟边缘计算',
'sol2-feature1-desc': '本地化实时数据处理。',
'sol2-feature2-title': '多维传感器融合',
'sol2-feature2-desc': '构建数字孪生底座。',
'sol2-feature3-title': 'AI 预测性维护',
'sol2-feature3-desc': '预防性更换关键部件。',
'sol2-feature4-title': '工业互联协议',
'sol2-feature4-desc': '支持 OPC-UA 与 TSN。',
'sol2-footer-label': '应用场景：',
'sol2-footer-value': '智慧工厂、高精度协作机器人。',

// 方案3 - 新能源动力
'sol3-badge': 'EV POWERTRAIN',
'sol3-subtitle': '极致功率密度驱动绿色出行',
'sol3-category': 'Electrification',
'sol3-title': '新能源动力总成系统方案',
'sol3-desc': '通过优化 OBC、DC/DC 与牵引逆变器，大幅减轻系统重量，显著提升电动汽车的续航里程与充电速度。',
'sol3-feature1-title': '高效 OBC 转化',
'sol3-feature1-desc': '采用宽禁带半导体设计。',
'sol3-feature2-title': '高功率逆变控制',
'sol3-feature2-desc': '提升整车扭矩响应。',
'sol3-feature3-title': '系统级减重方案',
'sol3-feature3-desc': '助力优异的整车推重比。',
'sol3-feature4-title': '全栈传感器支持',
'sol3-feature4-desc': '高可靠的动力闭环反馈。',
'sol3-footer-label': '关键技术：',
'sol3-footer-value': '融合 SiC/GaN 创新，支持 800V 高压架构。',

// 方案4 - 数据中心
'sol4-badge': 'AI DATA CENTER',
'sol4-subtitle': '从电网到芯片的“零损耗”追求',
'sol4-category': 'Sustainability',
'sol4-title': '数据中心与 AI 算力基座',
'sol4-desc': '凭借对 Si、SiC 和 GaN 技术的掌握，为全球 AI 工厂提供稳定、高效的绿色能源链路，降低 PUE 损耗。',
'sol4-feature1-title': '48V 电力分配',
'sol4-feature1-desc': '大幅降低机架损耗。',
'sol4-feature2-title': '高性能算力供电',
'sol4-feature2-desc': '大电流、极速动态响应。',
'sol4-feature3-title': '绿色 PSU 设计',
'sol4-feature3-desc': '能效比提升至 98% 以上。',
'sol4-feature4-title': '硬件级安全存储',
'sol4-feature4-desc': '确保算力节点的完整性。',
'sol4-footer-label': '技术闭环：',
'sol4-footer-value': '涵盖 ACDC/DCDC 转换，降低运营支出。',

// 方案5 - 医疗影像
'sol5-badge': 'MEDICAL IMAGING',
'sol5-subtitle': '毫米级精度的数字放射诊疗技术',
'sol5-category': 'Life Science',
'sol5-title': '数字放射成像与医学影像',
'sol5-desc': '提供临床级的图像传感器与高精度 ADC 方案。支持从移动式 X 光机到高端 CT 的全系列设备设计。',
'sol5-feature1-title': '放射级图像传感',
'sol5-feature1-desc': '极低噪声、高动态范围。',
'sol5-feature2-title': '定制化 SoC/SiP',
'sol5-feature2-desc': '集成前端信号处理。',
'sol5-feature3-title': '医疗级 AFE 接口',
'sol5-feature3-desc': '精准生物电信号采集。',
'sol5-feature4-title': '长寿命周期保障',
'sol5-feature4-desc': '确保 15-20 年稳定供应。',
'sol5-footer-label': '合规基石：',
'sol5-footer-value': '遵循 ISO 13485 标准，支持长期报批。',

// 方案6 - 通信 FPGA
'sol6-badge': 'TELECOM FPGA',
'sol6-subtitle': '户外极端环境下的稳健通信方案',
'sol6-category': 'Connectivity',
'sol6-title': '通信 FPGA 平台电源管理',
'sol6-desc': '为 5G 与无线基础设施提供智能功率级（SPS），确保在极端户外环境下具备出色的热性能与电源稳定性。',
'sol6-feature1-title': '智能多相驱动',
'sol6-feature1-desc': '满足大电流瞬态需求。',
'sol6-feature2-title': '紧凑型散热设计',
'sol6-feature2-desc': '提升布线密度与热管理。',
'sol6-feature3-title': '可重构电源导轨',
'sol6-feature3-desc': '适应多变的 5G 标准。',
'sol6-feature4-title': '电信级可靠性',
'sol6-feature4-desc': '内置稳健抗干扰保护。',
'sol6-footer-label': '应用定位：',
'sol6-footer-value': '基站 AAU/BBU、卫星通信链路。',

// 方案7 - BMS
'sol7-badge': 'AUTOMOTIVE BMS',
'sol7-subtitle': 'ASIL-D 级全栈电池安全监控',
'sol7-category': 'Battery Safety',
'sol7-title': '汽车 BMS 电池管理系统',
'sol7-desc': '实现了从电芯到电池包的全链路监控，通过隔离通信技术确保电气安全，优化电池全生命周期价值。',
'sol7-feature1-title': 'ASIL-D 功能安全',
'sol7-feature1-desc': '遵循最高等级安全认证。',
'sol7-feature2-title': '精准 SoC/SoH 算法',
'sol7-feature2-desc': '实时监控电池健康状态。',
'sol7-feature3-title': '隔离通信拓扑',
'sol7-feature3-desc': '支持 ISO-UART 与无线 BLE。',
'sol7-feature4-title': '多电压平台兼容',
'sol7-feature4-desc': '覆盖 48V 至 800V 系统。',
'sol7-footer-label': '未来视野：',
'sol7-footer-value': '支持电池护照与碳足迹追踪。',

// 服务客户类型
'client-main-title': '我们服务的客户类型',
'client-subtitle': '全生命周期技术赋能，连接芯片原厂与终端应用的桥梁',
'client1-title': '行业 OEM/ODM',
'client1-desc': '面向具备大规模生产能力的终端制造巨头。提供高可靠的前装级物料保障、全球供应链协同及严谨的品质追溯，确保高频交付下的产线稳定。',
'client2-title': '方案商与 IDH 机构',
'client2-desc': '服务于专注于技术输出的设计机构。通过原厂参考设计授权与底层算法支持，协助工程师在立项之初实现最优选型，降低二次开发风险。',
'client3-title': '垂直行业领军者',
'client3-desc': '聚焦高精密仪器、高性能电源及医疗系统等高门槛领域品牌。配合其对极致性能的追求，提供长生命周期供应承诺及严苛环境下的验证方案。',
'client4-title': '成长型初创企业',
'client4-desc': '助力机器人、低空经济及前沿硬件的早期研发团队。提供灵活的小批量采购方案与专家级技术顾问服务，加速创新产品从 Demo 走向验证量产。',

// 领域专业性洞察
'insight-title': '领域专业性洞察',
'insight-subtitle': '深度理解各行业芯片结构，预判并化解供应链风险',
'insight1-tag': 'Automotive',
'insight1-title': '汽车电子',
'insight1-challenge-label': '● 行业挑战',
'insight1-challenge-desc': '车规级 MCU/功率器件长交期波动；AEC-Q100 认证批次风险；SiC/IGBT 产能结构性紧张。',
'insight1-support-label': '○ 专项支持',
'insight1-support-desc': '整合原厂与授权资源，建立批次可追溯现货池，针对功率与 BMS 物料提供交期对冲方案。',
'insight2-tag': 'AI Infrastructure',
'insight2-title': 'AI与算力',
'insight2-challenge-label': '● 行业挑战',
'insight2-challenge-desc': 'GPU/HBM 资源周期性波动；48V 架构升级带来的电源结构变化；FPGA 高速接口供需不稳定。',
'insight2-support-label': '○ 专项支持',
'insight2-support-desc': '联动服务器级电源与高速存储资源，针对核心算力与供电物料建立快速调拨与安全库存策略。',
'insight3-tag': 'Industrial',
'insight3-title': '工业电子',
'insight3-challenge-label': '● 行业挑战',
'insight3-challenge-desc': '工业 MCU 长生命周期保障；隔离器与工业 PHY 缺料风险；老型号 EOL 预警滞后。',
'insight3-support-label': '○ 专项支持',
'insight3-support-desc': '建立工业长型号数据库，提供 EOL 预警、替代匹配及小批量长期稳定供给支持。',
'insight4-tag': 'Energy & Power',
'insight4-title': '电力与新能源',
'insight4-challenge-label': '● 行业挑战',
'insight4-challenge-desc': 'SiC/GaN 模块产能分配不均；BMS 与功率驱动芯片涨价波动；800V 平台升级带来的器件替换。',
'insight4-support-label': '○ 专项支持',
'insight4-support-desc': '通过功率器件专项资源整合与区域库存联动，为逆变器、储能平台提供交期缓冲方案。',
'insight5-tag': 'Medical',
'insight5-title': '医疗电子',
'insight5-challenge-label': '● 行业挑战',
'insight5-challenge-desc': '长生命周期供应需求（10–20 年）；高精度 ADC/AFE 料号集中度高；高可靠存储器交期不可控。',
'insight5-support-label': '○ 专项支持',
'insight5-support-desc': '建立医疗级关键型号稳定供给网络，支持批次一致性追溯，针对报批需求提供长期备货规划。',
'insight6-tag': 'Aero-Defense',
'insight6-title': '特种高可靠',
'insight6-challenge-label': '● 行业挑战',
'insight6-challenge-desc': '抗辐照（Rad-Hard）等极端性能约束；国产化替代指标压力；老旧型号持续供应风险。',
'insight6-support-label': '○ 专项支持',
'insight6-support-desc': '筛选全球宇航级资源，支持第三方权威机构检测，提供长达 20 年的批次一致性溯源与保障。',

// 典型客户
'partners-title': '典型客户',


// ========= about.html =========
// 页面标题
'page-about-title': '关于我们 - 极限智芯科技有限公司',

// Hero
'about-hero-title': '关于我们',
'about-hero-subtitle': '专业芯片分销 ▚ 提供价值服务',

// 公司概况
'about-overview-tag': 'SINCE 2016',
'about-overview-title': '❍ 电子元器件分销商',
'about-overview-text1': '极限智芯（深圳）科技有限公司成立于2016年，是一家专业的电子元器件分销商。我们专注于为全球客户提供高品质、可靠的芯片产品和供应链解决方案。',
'about-overview-text2': '公司总部位于中国深圳，依托珠三角完善的电子产业链优势，与全球知名芯片制造商建立了长期稳定的合作关系。我们的产品线涵盖微控制器、存储芯片、功率器件、模拟芯片等多个领域。',

// 企业使命
'about-mission-label': '企业使命',
'about-mission-slogan': '连接全球芯脉 · 赋能产业创新 · 守护供应链安全',
'about-mission-desc': '我们致力于构建芯片原厂与电子制造企业的坚实桥梁，通过卓越的供应链服务，协助客户精准获取核心元器件，化解缺货风险，保障供应链安全，共同驱动智能科技的发展。',

// 统计数据
'about-stat1-txt': '载行业经验',
'about-stat2-txt': '产品线',
'about-stat3-txt': '服务客户',
'about-stat4-txt': '个型号',

// 核心价值观
'about-values-title': '核心价值观',
'about-values-subtitle': 'Core Values · 引领持续稳健发展的根基',
'about-value1-title': '品质至上',
'about-value1-desc': '建立全流程质量追踪体系，承诺原厂正品，确保每一颗芯片都经得起严格检验。',
'about-value2-title': '敏捷响应',
'about-value2-desc': '专业团队协同工作，快速响应全球询价，提供及时的技术支持与供应链保障。',
'about-value3-title': '守信共赢',
'about-value3-desc': '秉持高度透明的商业准则，与原厂及客户建立深度互信的长期战略合作伙伴关系。',
'about-value4-title': '价值共创',
'about-value4-desc': '超越采销关系，通过数字化选型支撑与柔性物流方案，为客户创造供应链溢价空间。',

// 发展历程
'about-history-title': '发展历程',
'about-history-subtitle': 'Development Path · 专注领域 持续沉淀',
'about-history-year1': '2015',
'about-history-title1': '初探芯途 · 业务深耕',
'about-history-desc1': '创始团队正式进入电子元器件分销领域，积累了第一批核心渠道与行业know-how，为日后极限智芯的成立奠定了坚实的行业基础。',
'about-history-year2': '2016',
'about-history-title2': '注册成立 · 正式启航',
'about-history-desc2': '极限智芯（LIMCHIP）在深圳正式成立。创立之初即确立“原厂正品”核心原则，扎根电子元器件分销领域，开启标准化经营篇章。',
'about-history-year3': '2018',
'about-history-title3': '渠道扩展 · 目标达成',
'about-history-desc3': '打通渠道，经营产品线超过20+品牌；团队在TI、ADI、Infineon等国际半导体巨头的渠道逐渐建立市场优势。',
'about-history-year4': '2020',
'about-history-title4': '服务升级 · 供应链赋能',
'about-history-desc4': '引入ERP管理系统，建立柔性供应链管理体系。由单一分销转型为提供“一站式采购+技术支持+库存管理”的综合性解决方案服务商。',
'about-history-year5': '2023',
'about-history-title5': '持续耕耘 · 扩大影响',
'about-history-desc5': '持续开发各类渠道在主要 EMS 工厂具备议价能力 | 多渠道融合扩大我们的服务客户和产品丰富度为客户提供更透明、更高效的供应链体验。',
'about-history-year6': '2024-PRESENT',
'about-history-title6': '深耕赛道 · 优化升级',
'about-history-desc6': '深耕垂直行业，致力于成为中国科技产业最可靠的核心供应链合作伙伴。',

// CTA（复用部分已在 index 中定义的键，如 cta-tag，此处仅新增 about 特有的）
'about-cta-title': '携手共创智能未来',
'about-cta-subtitle': '凭借专业的行业经验与全球化的供应链网络，<br>让我们成为您最可信赖的电子元器件合作伙伴，助力您的产品快速迭代。',
'about-cta-btn': '联系我们',
'about-cta-trust1': '✓ 快速响应',
'about-cta-trust2': '✓ 原装正品',
'about-cta-trust3': '✓ 全球交付',


// ========= contact.html =========
// 页面标题
'page-contact-title': '联系我们 - 极限智芯科技有限公司',

// Hero
'contact-hero-title': '联系我们',
'contact-hero-subtitle': '专业的团队 ⊙ 欢迎随时咨询 ',

// 快速询价
'contact-rfq-title': '快速询价',
'contact-rfq-response': '2小时极速反馈',
'contact-rfq-label-name': '如何称呼您？',
'contact-rfq-placeholder-name': '姓名或公司名称 *',
'contact-rfq-label-contact': '如何联系您？',
'contact-rfq-placeholder-contact': '手机、邮箱或微信号 *',
'contact-rfq-label-needs': '您的需求信息是？',
'contact-rfq-placeholder-needs': '型号、品牌、数量及封装要求... *',
'contact-rfq-submit': '获取报价单',

// 联系信息
// 联系信息 - 竖排字符（原样保留）
'contact-side-title': '联系信息',
'contact-address-label': '地址',
'contact-address-value': '中国 ● 深圳市南山区波顿大厦A座1212',
'contact-phone-label': '电话',
'contact-phone-value': '+86 186 8873 3475',
'contact-email-label': '邮箱',
'contact-email-value': 'sales@limchip.com',

// 即时通讯
'contact-im-title': '即时通讯',
'contact-im-whatsapp': 'WhatsApp',
'contact-im-skype': 'Skype',
'contact-im-linkedin': 'LinkedIn',
'contact-im-wechat': 'WeChat',

            },

            'en': {
                'page-home-title': 'LimChip Co., LTD | Electronic Components Distributor & IC Sourcing',
                // Navigation

                'nav-home': 'Home',

                'nav-products': 'Products',

                'nav-services': 'Services',
				'nav-applications': 'Applications',

                'nav-about': 'About',

                'nav-contact': 'Contact',
                'btn-contact': 'Contact Now',
                'nav-search-placeholder': 'Search part number, brand or category...',
                'nav-search-no-result': 'No matching part.',
                'nav-search-submit-rfq': 'Submit RFQ',

                

                // Footer

// ========= footer.html =========
// 标语
'footer-slogan-main': 'Rooted in Chips ◆ Driven by Vision',
'footer-slogan-sub': 'Create Value · Quality First · Service First',

// 快速链接标题
'footer-quick-links': 'Quick Links',

// 联系我们标题
'footer-contact-title': 'Contact Us',

// 联系信息标签
'footer-contact-phone-fixed': ' Tel: ',
'footer-contact-phone-mobile': ' Mobile: ',
'footer-contact-email': ' Email: ',
'footer-contact-wechat': ' WeChat: ',
'footer-contact-qq': ' QQ: ',
"footer-contact-address": " HQ: ",
"footer-contact-address-val": " Hong Kong ● China",

// 底部版权
'footer-bottom-copyright': '© 2026 ◈ LIMCHIP CO. LTD. ◈ All Rights Reserved',

                

// =========index ========

// Hero
'hero-title-all': 'CONNECTING GLOBAL CHIPS',
'hero-subtitle': 'Driving Smart Future',
'hero-description': 'LimChip is dedicated to providing global clients with premium electronic components and superior supply chain solutions.',
'hero-btn-more': 'Learn More',
// About
'about-year': 'Since 2016',
'about-title-sub': 'PROFESSIONAL',
'about-title-main': 'ELECTRONIC COMPONENT <span class="text-accent">SUPPLIER</span>',
'about-desc-primary': '<strong>LimChip</strong> is dedicated to providing superior electronic component supply solutions to global manufacturers.',
'about-desc-sub': 'Leveraging deep global strategic channels and precision digital management, we empower customers with full-lifecycle procurement capabilities from prototyping to mass production. By organizing superior supply sources, we systematically solve supply bottlenecks.',
'about-btn-us': 'About Us',
// Stats
'stat-clients-p': 'Over',
'stat-clients-l': 'Clients Served',
'stat-exp-s': 'Y',
'stat-exp-l': 'Years Experience',
'stat-brands-l': 'Partner Brands',
'stat-response-s': 'H',
'stat-response-l': 'Response Time',
// Core Values
'values-title': 'CORE ADVANTAGES',
'values-subtitle': 'Comprehensive Supply Chain Assurance System',
'values-card-1-t': 'Quality Assurance',
'values-card-1-d': 'Direct supply from original channels, full-batch traceability, ensuring zero-defect delivery.',
'values-card-2-t': 'Fast Response',
'values-card-2-d': 'FAE technical team on standby, providing complete sourcing options within 24 hours.',
'values-card-3-t': 'Global Sourcing',
'values-card-3-d': 'Covering Europe, America, Japan, and Korea channels to solve shortage and long-tail sourcing challenges.',
'values-stat-1': 'Part Numbers #',
'values-stat-2': 'High Quality Standards',
'values-stat-3': 'Digital SC Management',
// Products
'prod-cat-tag': 'PRODUCT CATEGORY',
'prod-cat-title': 'PRODUCT PORTFOLIO',
'prod-cat-subtitle': 'Multi-dimensional coverage of core electronic component fields',
'prod-cat-1-t': 'Integrated Circuits (IC)',
'prod-cat-1-d': 'High-performance digital chips, analog chips, and power management ICs.',
'prod-cat-2-t': 'Power Devices',
'prod-cat-2-d': 'IGBT, MOSFET, and wide-bandgap semiconductors such as SiC/GaN.',
'prod-cat-3-t': 'Memory & Storage',
'prod-cat-3-d': 'Covering DRAM, NAND Flash, SRAM, and industrial storage solutions.',
'prod-cat-4-t': 'Connectors',
'prod-cat-4-d': 'High-reliability Board-to-Board, Wire-to-Board connectors and industrial interfaces.',
'prod-cat-5-t': 'Passive Components',
'prod-cat-5-d': 'High-reliability capacitors, precision resistors, and inductors.',
'btn-more-detail': 'More Details',
// Brands & Industry
'brand-title': 'LINE CARDS',
'btn-more': 'More',
'ind-title': 'INDUSTRY SOLUTIONS',
'ind-card-1-t': 'Automotive',
'ind-card-1-d': 'Automotive grade BMS, smart cockpit, and ADAS components.',
'ind-card-2-t': 'Industrial Control',
'ind-card-2-d': 'Smart factory, robotics, PLC, and servo drive systems.',
'ind-card-3-t': 'Telecommunications',
'ind-card-3-d': '5G base stations, IoT RF front-end, and optical communication chips.',
'ind-card-4-t': 'Medical Electronics',
'ind-card-4-d': 'High-precision imaging, portable diagnostics, and monitors.',
'ind-card-5-t': 'Consumer Electronics',
'ind-card-5-d': 'Wearables, drones, and smart home devices.',
'ind-card-6-t': 'New Energy',
'ind-card-6-d': 'PV inverters, energy storage, and charging pile power devices.',
'btn-ind-detail': 'Industry Expertise',
// Flow
'flow-title': 'STANDARDIZED PROCESS',
'flow-step-1-t': 'Requirement Analysis',
'flow-step-1-d': 'Deep communication of application scenarios to match precise parameters.',
'flow-step-2-t': 'Solution Validation',
'flow-step-2-d': 'Providing sample support and technical evaluation for perfect fit.',
'flow-step-3-t': 'Global Logistics',
'flow-step-3-d': 'Original products delivered fast via global supply chain synergy.',
'flow-step-4-t': 'After-sales Support',
'flow-step-4-d': '24H technical support for long-term quality assurance.',
// CTA
'cta-tag': 'READY TO START?',
'cta-title': 'SUPPLY CHAIN SOLUTIONS',
'cta-desc': 'Whether sourcing hard-to-find parts or optimizing long-term costs, our experts are ready.',
'cta-btn-submit': 'Submit RFQ',
'cta-btn-contact': 'Contact Support',
'cta-note-1': 'Professional Response',
'cta-note-2': 'Original Stock',

// 页面标题
'page-products-title': 'Electronic Components Products | FPGA, Memory, MCU & IC Supply - LimChip',

// Hero
'products-hero-title': 'Products',
'products-hero-subtitle': 'Hybrid Distribution ⧈ Diverse Channels ⧈ Rich Products',

// 产品分类
'products-section-categories': 'Product Categories',
'products-section-subtitle1': 'Full Coverage of Electronic Components',
'products-section-subtitle2': 'One-Stop Support for Your Supply Chain',

// 公共
'prod-including': 'Including:',

// 产品卡片 - 微控制器与处理器
'prod-mcu-title': 'Microcontrollers & Processors',
'prod-mcu-subtitle': 'Microcontrollers & Processors',
'prod-mcu-tag1': 'Automotive BMS Battery Management System',
'prod-mcu-tag2': 'PLC / Industrial HMI',
'prod-mcu-tag3': 'AI Computing & Robotics',
'prod-mcu-tag4': 'PV String Inverter Control',
'prod-mcu-tag5': 'Main Control Board',
'prod-mcu-tag6': 'Communication Base Station & Edge Gateway',
'prod-mcu-tag7': 'High-Reliability Medical Monitors',
'prod-mcu-desc': 'High-performance 32-bit dual-core MCU, ultra-low power MSP series MCU, industrial heterogeneous multi-core processor (MPU), SoC system-level computing chip, dedicated digital signal processor (DSP), Arm MCU, automotive-grade MCU; various CPU processors.',
'prod-mcu-spec1-label': 'Core Architecture',
'prod-mcu-spec2-label': 'Computing Performance',
'prod-mcu-spec3-label': 'Integrated Peripherals',
'prod-mcu-tag': 'Computing Core',

// 产品卡片 - 专用芯片 (ASIC/FPGA)
'prod-asicfpga-title': 'Custom ICs (ASIC/FPGA)',
'prod-asicfpga-subtitle': 'Custom ICs & Programmable Logic',
'prod-asicfpga-tag1': '5G Base Station Beamforming',
'prod-asicfpga-tag2': 'Edge AI Vision Processing',
'prod-asicfpga-tag3': 'High-Frequency Trading (HFT) Acceleration',
'prod-asicfpga-tag4': '4K/8K Video Codec',
'prod-asicfpga-tag5': 'Industrial Robot Motion Control',
'prod-asicfpga-tag6': 'Aerospace & Defense Simulation Prototype',
'prod-asicfpga-tag7': 'Medical Image Real-Time Enhancement',
'prod-asicfpga-desc': 'Field Programmable Gate Array (FPGA), system-level embedded SoC FPGA, complex programmable logic device (CPLD), system-on-module (SoM/SOM), custom ASIC solutions, high-performance FPGA accelerator cards, and development/evaluation kits.',
'prod-asicfpga-spec1-label': 'Core Features',
'prod-asicfpga-spec2-label': 'Acceleration Capability',
'prod-asicfpga-spec3-label': 'Hardware Interfaces',
'prod-asicfpga-tag': 'Programmable Logic',

// 产品卡片 - 存储芯片
'prod-memory-title': 'Memory & Storage',
'prod-memory-subtitle': 'Memory & Data Storage',
'prod-memory-tag1': 'High-Performance DDR5/LPDDR5X',
'prod-memory-tag2': 'Automotive High-Capacity & Reliable Storage',
'prod-memory-tag3': 'Industrial Controller Embedded eMMC Solutions',
'prod-memory-tag4': 'AI Large Model HBM High-Bandwidth Memory',
'prod-memory-tag5': 'SSD Core Controllers & NAND',
'prod-memory-tag6': 'Low-Power IoT SPI Nor Flash',
'prod-memory-tag7': 'Industrial PLC & HMI Embedded Flash Solutions',
'prod-memory-desc': 'DRAM, NAND Flash, serial/parallel Nor Flash, eMMC, UFS, EEPROM, and high-reliability automotive/industrial memory modules.',
'prod-memory-spec1-label': 'Access Bandwidth',
'prod-memory-spec2-label': 'Reliability',
'prod-memory-spec3-label': 'Operating Temperature',
'prod-memory-tag': 'Data Foundation',

// 产品卡片 - 电源 PowerIC
'prod-poweric-title': 'Power ICs',
'prod-poweric-subtitle': 'Advanced Power Management',
'prod-poweric-tag1': 'Automotive BMS',
'prod-poweric-tag2': 'Adaptive Driving Beam (ADB) Matrix Control',
'prod-poweric-tag3': 'FPGA & Processor Core Power Supply',
'prod-poweric-tag4': '48V Mild-Hybrid & HV DC-DC Conversion',
'prod-poweric-tag5': 'GaN Fast Charging & Resonant Power',
'prod-poweric-tag6': 'Industrial Robot Multi-Channel Drive & Protection',
'prod-poweric-desc': 'Highly integrated PMIC, SBC, multi-cell monitoring & balancing ICs, high-speed gate drivers, IPM, high-efficiency MOSFET/IGBT, LED drivers, and wide-bandgap semiconductors (GaN/SiC).',
'prod-poweric-spec1-label': 'Conversion Efficiency',
'prod-poweric-spec2-label': 'Transient Response',
'prod-poweric-spec3-label': 'Power Density',
'prod-poweric-tag': 'Power Core',

// 产品卡片 - 传感器
'prod-sensor-title': 'Sensors',
'prod-sensor-subtitle': 'Comprehensive Sensing Solutions',
'prod-sensor-tag1': 'High-Pixel CMOS Image Recognition & Vision Systems',
'prod-sensor-tag2': 'MEMS IMU Navigation',
'prod-sensor-tag3': 'Industrial High-Precision Temp/Humidity Monitoring',
'prod-sensor-tag4': 'Millimeter-Wave Radar Obstacle Avoidance & Detection',
'prod-sensor-tag5': 'Magnetic Position Sensing for Steering & Throttle',
'prod-sensor-tag6': 'Ambient Air Quality (VOC) & Pressure Sensing',
'prod-sensor-desc': 'CMOS image sensors (CIS), MEMS pressure & accelerometers, temp/humidity sensors, magnetic switches & position sensors, radar SoCs, silicon microphones, gas/water quality sensing modules, and 3D ToF ranging chips.',
'prod-sensor-spec1-label': 'Sensing Dimensions',
'prod-sensor-spec2-label': 'Measurement Accuracy',
'prod-sensor-spec3-label': 'Integrated Solutions',
'prod-sensor-tag': 'Sensing Frontend',

// 产品卡片 - 车规级专用芯片
'prod-automotive-title': 'Automotive Qualified ICs',
'prod-automotive-subtitle': 'Automotive Qualified ICs',
'prod-automotive-tag1': 'ADAS Domain Controller SoC',
'prod-automotive-tag2': 'New Energy Powertrain (VVCU) Core Control',
'prod-automotive-tag3': 'Chassis (Steering/Brake) Safety Drive',
'prod-automotive-tag4': 'In-Vehicle High-Speed Backbone (Ethernet/CAN-XL)',
'prod-automotive-tag5': 'Smart Cockpit SoC & High-Performance Power Supply',
'prod-automotive-tag6': 'Functional Safety Monitor & Watchdog ICs',
'prod-automotive-desc': 'AEC-Q100 qualified MCUs, SBCs, automotive ASICs, in-vehicle Ethernet transceivers, functional safety power management ICs, and sensing/driver ICs meeting high ASIL levels.',
'prod-automotive-spec1-label': 'Functional Safety',
'prod-automotive-spec2-label': 'Reliability Grade',
'prod-automotive-spec3-label': 'Lifecycle',
'prod-automotive-tag': 'Vehicle Core',

// 产品卡片 - 数据转换器 (ADC/DAC)
'prod-adcdac-title': 'Data Converters (ADC/DAC)',
'prod-adcdac-subtitle': 'Data Converters & AFE',
'prod-adcdac-tag1': '5G Base Station RF Transceiver',
'prod-adcdac-tag2': 'High-End Medical Imaging (CT/MRI) AFE',
'prod-adcdac-tag3': 'Industrial Automation Digital Potentiometer Control',
'prod-adcdac-tag4': 'Optical Monitoring CCD/CIS Imaging Signal Chain',
'prod-adcdac-tag5': 'High-Bandwidth Oscilloscope High-Speed Sampling',
'prod-adcdac-tag6': 'Aerospace Precision Voltage Reference Conversion',
'prod-adcdac-desc': 'ADC, DAC, RFIC, precision & high-speed conversion cores, digital potentiometers, isolated ADCs, medical AFE, and integrated precision data acquisition systems.',
'prod-adcdac-spec1-label': 'Conversion Speed',
'prod-adcdac-spec2-label': 'Conversion Accuracy',
'prod-adcdac-spec3-label': 'Integration Features',
'prod-adcdac-tag': 'Analog⇌Digital',

// 产品卡片 - 接口芯片
'prod-interface-title': 'Interface ICs',
'prod-interface-subtitle': 'Interface & Connectivity',
'prod-interface-tag1': 'Automotive High-Speed SerDes',
'prod-interface-tag2': 'Industry 4.0 Automation IO-Link',
'prod-interface-tag3': 'High-Performance Video Transmission (HDMI/DisplayPort)',
'prod-interface-tag4': 'Ultra-High-Speed Data Center PCIe/SATA/SAS Links',
'prod-interface-tag5': 'USB Type-C & Power Delivery (PD) Systems',
'prod-interface-tag6': 'Long-Distance RS-485/422 Anti-Interference Communication',
'prod-interface-desc': 'CAN/LIN transceivers, RS-232/485 multi-protocol ICs, Ethernet PHY, high-speed video interfaces (MIPI/LVDS), I2C/SPI switches & level shifters, USB controllers, high-speed serializers (FPD-Link/V3Link), and SBCs.',
'prod-interface-spec1-label': 'Transmission Bandwidth',
'prod-interface-spec2-label': 'Protocol Compatibility',
'prod-interface-spec3-label': 'Signal Integrity',
'prod-interface-tag': 'Connectivity',

// 产品卡片 - 射频、微波与毫米波
'prod-rf-title': 'RF, Microwave & Millimeter Wave',
'prod-rf-subtitle': 'RF, Microwave & Millimeter Wave',
'prod-rf-tag1': 'Aerospace & Defense (ADEF) Radar Systems',
'prod-rf-tag2': '5G/6G Base Stations & Software Defined Radio (SDR)',
'prod-rf-tag3': 'Satellite Communication (Satcom) Beamforming Arrays',
'prod-rf-tag4': '100GHz+ Ultra-High Frequency Test & Measurement Instruments',
'prod-rf-tag5': 'Electronic Warfare (EW) & Broadband Signal Jamming',
'prod-rf-tag6': 'Industrial Automation Robotics & mmWave Sensing',
'prod-rf-desc': 'PLL synthesizers, RF ADC/DAC, mixed-signal front-end (MxFE®), high-power GaN amplifiers, RF switches/mixers/attenuators, multi-channel beamformers, VFC, and VCOs.',
'prod-rf-spec1-label': 'Spectrum Coverage',
'prod-rf-spec2-label': 'Integration Technology',
'prod-rf-spec3-label': 'Manufacturing Process',
'prod-rf-tag': 'Antenna to Bits',

// 产品卡片 - 分立器件与功率半导体
'prod-discrete-title': 'Power Discretes & Semiconductors',
'prod-discrete-subtitle': 'Power Discretes, MOSFET & IGBT',
'prod-discrete-tag1': 'New Energy Vehicle Traction Inverter',
'prod-discrete-tag2': 'Industrial Robot Servo Drive & Motor Control',
'prod-discrete-tag3': 'PV & Wind Energy Storage (ESS) Conversion',
'prod-discrete-tag4': 'Data Center High-Power Density Power Modules',
'prod-discrete-tag5': 'Rail Transit HV Electric Traction Systems',
'prod-discrete-tag6': 'Consumer Electronics PD Fast Charging & Inverter Control',
'prod-discrete-desc': 'High-efficiency power MOSFETs, IGBT discrete/modules, SiC/GaN power devices, IPM, rectifier diodes, thyristors, ESD protection devices, and small-signal transistors.',
'prod-discrete-spec1-label': 'Voltage Rating',
'prod-discrete-spec2-label': 'Switching Performance',
'prod-discrete-spec3-label': 'Package & Thermal',
'prod-discrete-tag': 'Power Foundation',

// 产品卡片 - 连接器
'prod-connector-title': 'Connectors',
'prod-connector-subtitle': 'Connectors & Interconnects',
'prod-connector-tag1': 'New Energy Vehicle HV High-Current Connection',
'prod-connector-tag2': 'In-Vehicle High-Speed Ethernet & FAKRA RF Connection',
'prod-connector-tag3': 'Industrial Robot High-Flex Servo Motor Interface',
'prod-connector-tag4': 'Data Center 112G/224G High-Speed Backplane',
'prod-connector-tag5': 'Aerospace Corrosion-Resistant Circular Connectors',
'prod-connector-tag6': 'Medical High-Mating-Cycle Precision Interfaces',
'prod-connector-desc': 'BTB, wire-to-board, high-speed backplane, circular/rectangular industrial connectors, HVIL plugs, RF coaxial connectors, fiber optic connectors, and custom harness assemblies.',
'prod-connector-spec1-label': 'Electrical Performance',
'prod-connector-spec2-label': 'Signal Rate',
'prod-connector-spec3-label': 'Environmental Protection',
'prod-connector-tag': 'Stable Interconnect',

// 产品卡片 - 开发工具与生态
'prod-devtools-title': 'Development Tools & Ecosystem',
'prod-devtools-subtitle': 'Development Tools & Ecosystem',
'prod-devtools-tag1': 'AURIX™ & S32 Core Evaluation Kits',
'prod-devtools-tag2': 'MATLAB / Simulink Model-Based Development',
'prod-devtools-tag3': 'Edge Computing AI Algorithm Rapid Deployment',
'prod-devtools-tag4': 'Functional Safety (ISO 26262) Validation Tools',
'prod-devtools-tag5': 'Digital Twin & Online System Simulation',
'prod-devtools-tag6': 'Wireless RF (SDR) Design & Verification Platforms',
'prod-devtools-desc': 'EVB & design kits, IDE, hardware emulators, SDK, configurators, online interactive simulators, and developer community support.',
'prod-devtools-spec1-label': 'Development Acceleration',
'prod-devtools-spec2-label': 'Compatibility',
'prod-devtools-spec3-label': 'Design Resources',
'prod-devtools-tag': 'R&D Enablement',
// 产品卡片 - spec-value 值
// 微控制器与处理器
'prod-mcu-spec1-value': 'Arm® / RISC-V / DSP Hybrid Architecture',
'prod-mcu-spec2-value': 'Ultra-Low Power to 2.0GHz+',
'prod-mcu-spec3-value': '16-bit ADC / CAN-FD / PWM',

// 专用芯片 (ASIC/FPGA)
'prod-asicfpga-spec1-value': 'Low-Latency Parallel Processing / Dynamic Configuration',
'prod-asicfpga-spec2-value': 'Integrated AI Engine / Hard DSP Cores',
'prod-asicfpga-spec3-value': 'High-Speed Transceivers / PCIe Gen5 / DDR5',

// 存储芯片
'prod-memory-spec1-value': 'Up to 8.5Gbps+ / Multi-Channel Support',
'prod-memory-spec2-value': 'ECC Engine / 100K+ Program/Erase Cycles',
'prod-memory-spec3-value': 'Meets -40°C to 125°C Harsh Environments',

// 电源 PowerIC
'prod-poweric-spec1-value': 'Up to 99% Peak Efficiency / Ultra-Low Quiescent Current',
'prod-poweric-spec2-value': 'Fast Transient Response (VTT/Core) / Zero Overshoot',
'prod-poweric-spec3-value': 'High-Frequency GaN Architecture / Extreme Miniaturization',

// 传感器
'prod-sensor-spec1-value': 'Vision, Motion, Environment, Position Holographic Sensing',
'prod-sensor-spec2-value': '±0.1°C Temp Accuracy / Sub-Micron Displacement',
'prod-sensor-spec3-value': 'Multi-Sensor Fusion (IMU+GNSS+)',

// 车规级专用芯片
'prod-automotive-spec1-value': 'Fully Compliant with ISO 26262 ASIL-B/D',
'prod-automotive-spec2-value': 'AEC-Q100 Grade 0/1 (-40°C~150°C)',
'prod-automotive-spec3-value': '15+ Years Longevity / Zero Defect Quality',

// 数据转换器 (ADC/DAC)
'prod-adcdac-spec1-value': 'GSPS Ultra-High-Speed Sampling / High Bandwidth',
'prod-adcdac-spec2-value': '24-bit+ Resolution / nV Noise Floor',
'prod-adcdac-spec3-value': 'Integrated Isolation / Digital Filtering Engine',

// 接口芯片
'prod-interface-spec1-value': '16Gbps+ Ultra-High Speed / 4K/8K Video Links',
'prod-interface-spec2-value': 'Full Protocol Coverage (CAN-FD / USB4 / PCIe Gen5)',
'prod-interface-spec3-value': 'Integrated Retimer & Advanced ESD Protection',

// 射频、微波与毫米波
'prod-rf-spec1-value': 'DC to 100 GHz+ Full Spectrum Coverage',
'prod-rf-spec2-value': 'MxFE® with Integrated DSP',
'prod-rf-spec3-value': 'Advanced GaN / GaAs / SiGe / SOI Processes',

// 分立器件与功率半导体
'prod-discrete-spec1-value': '20V to 6500V+ Voltage Range',
'prod-discrete-spec2-value': 'Ultra-Low Rds(on) / Fast Switching',
'prod-discrete-spec3-value': 'Advanced Double-Sided Cooling / High-Reliability Press-Fit',

// 连接器
'prod-connector-spec1-value': 'Low Contact Resistance / 1000V+ Insulation',
'prod-connector-spec2-value': 'PAM4 Support / Ultra-Low Insertion Loss',
'prod-connector-spec3-value': 'IP68/IP69K Waterproof / High Vibration Resistance',

// 开发工具与生态
'prod-devtools-spec1-value': 'Graphical Configuration / Auto Code Generation',
'prod-devtools-spec2-value': 'Supports IAR/Keil Compilers',
'prod-devtools-spec3-value': 'Rich Reference Designs',


// 品牌区域
'brand-main-title': 'PRODUCT BRANDS',
'brand-global-badge': 'Global',
'brand-global-name': 'International Brands',
'brand-global-desc': 'Sourcing from world-renowned semiconductor brands through primary channels for enduring strategic partnerships.',
'brand-global-ti-desc': 'Analog ICs, Power ICs',
'brand-global-st-desc': 'MCUs, Sensors',
'brand-global-infineon-desc': 'Power Devices, Automotive ICs',
'brand-global-adi-desc': 'Data Converters, RF ICs',
'brand-global-nxp-desc': 'Automotive MCUs, Interface ICs',
'brand-global-altera-desc': 'FPGA, CPLD',
'brand-global-xilinx-desc': 'FPGA, SoC',
'brand-global-sk-desc': 'Memory, DRAM',
'brand-global-samsung-desc': 'Memory, Flash',
'brand-global-micron-desc': 'Memory, DDR, eMMC',
'brand-global-nvidia-desc': 'GPU, AI Computing',
'brand-global-amd-desc': 'CPU, Computing Platforms',
'brand-global-intel-desc': 'CPU, Network ICs',
'brand-global-microchip-desc': 'MCU, Analog',
'brand-global-mps-desc': 'Power Management',
'brand-global-nexperia-desc': 'Discretes, Logic ICs',
'brand-global-onsemi-desc': 'MOSFET, Drivers',
'brand-global-broadcom-desc': 'Networking, RF',
'brand-global-realtek-desc': 'Audio/Network Controllers',
'brand-global-vicor-desc': 'High-Density Power Modules',

'brand-domestic-badge': 'FROM CHINA',
'brand-domestic-name': 'Leading Chinese Brands',
'brand-domestic-desc': 'Strengthening the Chinese chip supply chain to offer high-performance, cost-effective semiconductor alternatives.',
'brand-domestic-hisilicon-desc': 'Hisilicon',
'brand-domestic-gigadevice-desc': 'GigaDevice',
'brand-domestic-sgmicro-desc': 'SGMICRO',
'brand-domestic-rockchip-desc': 'Rockchip',
'brand-domestic-longsys-desc': 'Longsys',
'brand-domestic-allwinner-desc': 'Allwinner',
'brand-domestic-pango-desc': 'PanGo FPGA',
'brand-domestic-yangjie-desc': 'Yangjie',
'brand-domestic-unisoc-desc': 'UNISOC',
'brand-domestic-3peak-desc': '3PEAK',
'brand-domestic-nuvoton-desc': 'Nuvoton',
'brand-domestic-mediatek-desc': 'MediaTek',
'brand-domestic-macronix-desc': 'Macronix',
'brand-domestic-nanya-desc': 'Nanya',
'brand-domestic-winbond-desc': 'Winbond',

'brand-scroller-title': 'PRODUCT BRAND',

// 质量管控
'quality-title': 'RIGOROUS QUALITY CONTROL SYSTEM',
'quality-subtitle': 'Three-level deep inspection process ensures 100% original genuine chips delivered to customers',
'quality-step-1': 'Step 01',
'quality-step1-node1': 'Label Verification',
'quality-step1-node2': 'Marking Comparison',
'quality-step1-node3': 'Microscopic Inspection',
'quality-step1-title': 'Appearance & Packaging Inspection',
'quality-step1-desc': 'Strictly check original labels, batch numbers, and perform marking comparison under high-definition microscope.',
'quality-step-2': 'Step 02',
'quality-step2-node1': 'X-Ray Scanning',
'quality-step2-node2': 'Decap Verification',
'quality-step2-node3': 'Die Measurement',
'quality-step2-title': 'Laboratory Deep Verification',
'quality-step2-desc': 'Perform X-Ray internal scanning and decap to check die size.',
'quality-step-3': 'Step 03',
'quality-step3-node1': 'Constant Temp & Humidity',
'quality-step3-node2': 'ESD Protection',
'quality-step3-node3': 'Vacuum Packaging',
'quality-step3-title': 'Warehousing & Logistics Protection',
'quality-step3-desc': '24H constant temp/humidity warehouse storage, implementing original-grade ESD standards.',

// BOM
'bom-title-line1': 'BOM',
'bom-title-line2': 'Quick Service',
'bom-subtitle': 'Simply upload your BOM, and our senior procurement engineers will provide a solution within 2 hours.',
'bom-item1': 'Real-time inventory price comparison from 5000+ global suppliers',
'bom-item2': 'EOL and shortage part replacement suggestions',
'bom-item3': 'Digital supply chain tracking to reduce overall procurement costs',
'bom-upload-title': 'Submit RFQ Now',
'bom-btn': 'Send BOM Now',
'bom-formats': 'Supports .xlsx / .pdf / .csv formats',

// 网络
'network-title-main': 'GLOBAL LOGISTICS',
'network-title-sub': 'SUPPLY CHAIN NETWORK',
'network-card-title': 'GLOBAL · FAST DELIVERY',
'network-item1-title': 'Global Service Network',
'network-item1-desc': 'With hubs in Shenzhen, Hong Kong, and Singapore, we serve customers worldwide. Modern warehouses with stock enable 24H delivery in core cities.',
'network-item2-title': 'US/EU Original Channels',
'network-item2-desc': 'Deep industry roots connecting globally. Leveraging 300+ US/EU original brands, we ensure priority allocation for shortage parts.',
'network-stat1-label': 'Countries Covered',
'network-stat2-label': 'Quote Response',
'network-stat3-label': 'Original Guarantee',

// ========= services.html =========
// 页面标题
'page-services-title': 'Electronic Components Sourcing & BOM Procurement Services - LimChip',

// Hero
'services-hero-title': 'SUPPLY CHAIN INTELLIGENCE',
'services-hero-subtitle': 'Quality Assurance ◘ Clients First',

// 品质保障
'services-qc-main-title': 'QUALITY & ASSURANCE',
'services-qc-subtitle': 'Comprehensive inspection processes and rigorous system management to create a risk-free component supply environment',
"services-qc-title-1": "ZERO DEFECT QUALITY",
"services-qc-title-2": "Full-Process Lab System",
'services-qc-desc': 'We have our own strict supplier qualification and material re-inspection system. We not only provide chips but also shield you from all potential supply chain risks through multi-dimensional physical and electrical performance tests.',
'qc-step1-h': 'Appearance Consistency Inspection',
'qc-step1-p': 'Marking, package, and original label verification under high-power microscope to detect refurbished parts.',
'qc-step2-h': 'X-Ray Structure Detection',
'qc-step2-p': 'Check consistency of die, lead frame, and dimensions to eliminate empty packages and counterfeit chips.',
'qc-step3-h': 'Decap Analysis',
'qc-step3-p': 'Physical decapsulation to compare internal die markings with original database.',
'qc-step4-h': 'Electrical & Stress Testing',
'qc-step4-p': 'Validate parameters under different temperatures to ensure long-term stability.',
'qc-track-check': 'Inspection Coverage',
'qc-track-origin': 'Traceable to Origin',
'qc-track-standard': 'Incoming Verification',
'qc-track-service': 'Quality System',

// 全球供应链渠道
'services-gsc-primary-title': 'GLOBAL SUPPLY CHAIN CHANNELS',
'services-gsc-secondary-title': 'Global Shortage Chip Spot Hedging Delivery Solutions',
'services-gsc-desc': 'Integrating OEM factory surplus, original and distributor channels, as well as customer/peer inventory, to match shortage parts in real time, ensuring deliverable solutions and continuous production lines.',
'services-gsc-core-scope': 'CORE SCOPE',
'services-gsc-item1': 'CPU / MCU / MPU / DSP',
'services-gsc-item2': 'FPGA / CPLD',
'services-gsc-item3': 'Power ICs / IGBT / SiC / GaN / PMIC',
'services-gsc-item4': 'Analog & Signal Chain (ADC / DAC / Op-Amp / PGA / Interface IC)',
'services-gsc-item5': 'DDR / SRAM / NAND / NOR / EEPROM',
'services-gsc-item6': 'RF / Wireless Modules / Ethernet',
'services-gsc-item7': 'Sensors / TVS / ESD / Protection',
'services-gsc-item8': 'Clock & Timing',
'services-gsc-item9': 'Switches & Multiplexers',
'services-gsc-item10': 'Interfaces & Isolation',
'services-gsc-item11': 'Security & Authentication',

// 三张卡片
'services-card1-title': 'Multi-Channel Spot Inventory Hedging',
'services-card1-desc': 'Direct connection to global authorized agents and OEM/EMS buffer pools, cross-regional hedging scheduling, precisely targeting supply gaps.',
'services-card2-title': '7×24h Rapid Response Delivery',
'services-card2-desc': 'Global rolling quotation system, real inventory feedback within hours. Supports same-day dispatch from own warehouse, reducing risk windows.',
'services-card3-title': 'End-to-End Quality Compliance',
'services-card3-desc': 'Strict incoming inspection and third-party re-testing, complete trade documentation, ensuring absolutely compliant deliveries.',

// 核心服务
'services-section-services': 'Core Services',
'services-section-services-desc': 'One-Stop Electronic Components Supply Chain Services',
'services-service1-title': 'Global Sourcing',
'services-service1-desc': 'Covering global procurement network to ensure stable and reliable supply chain',
'services-service2-title': 'Quality Inspection',
'services-service2-desc': 'Strict quality inspection processes, meeting highest quality standards',
'services-service3-title': 'Warehousing & Logistics',
'services-service3-desc': 'Modern warehousing and efficient logistics to ensure timely delivery',
'services-service4-title': 'Technical Support',
'services-service4-desc': 'Professional team providing comprehensive technical consultation',

// 服务流程
'services-section-process': 'Service Process',
'services-section-process-desc': 'Standardized process to ensure service quality',
'services-step1-title': 'Requirement Confirmation',
'services-step1-desc': 'Detailed understanding of customer needs',
'services-step2-title': 'Solution Formulation',
'services-step2-desc': 'Develop optimal solutions',
'services-step3-title': 'Procurement Execution',
'services-step3-desc': 'Global sourcing of quality products',
'services-step4-title': 'Quality Inspection',
'services-step4-desc': 'Strict quality testing',
'services-step5-title': 'Delivery Service',
'services-step5-desc': 'Timely and secure delivery',

// 服务优势
'services-section-advantages': 'Service Advantages',
'services-section-advantages-desc': 'Why Choose Us',
'services-advantage1-title': 'Professional Team',
'services-advantage1-desc': 'A professional team with years of industry experience, deeply understanding customer needs and providing customized solutions. We not only offer products but also professional technical support and consulting services.',
'services-advantage2-title': 'Quality Assurance',
'services-advantage2-desc': 'Strict quality control system, all products sourced from original manufacturers or authorized distributors, ensuring 100% genuine parts. Multiple inspection processes guarantee product quality meets the highest standards.',
'services-advantage3-title': 'Fast Response',
'services-advantage3-desc': 'Respond to customer needs within 24 hours, quick quotes, timely delivery. Flexible supply chain system to handle various urgent needs, ensuring project progress.',
'services-advantage4-title': 'Cost Optimization',
'services-advantage4-desc': 'Global procurement network to find the best prices for customers. Volume purchasing advantages provide competitive pricing and reduce procurement costs.',

// ========= applications.html =========
// 页面标题
'page-apps-title': 'Electronics Applications | Automotive, Industrial & AI Component Sourcing - LimChip',

// Hero
'apps-hero-title': 'Industry Empowerment',
'apps-hero-subtitle': 'Deep in the Industry ➽ Creating Value',

// 应用领域
'apps-section-title': 'Application Areas',
'apps-section-subtitle1': 'Deeply Cultivating Global Semiconductor Gold Tracks',
'apps-section-subtitle2': 'Precisely Empowering High-Value Application Scenarios',

// 应用卡片（8个）
'app-card1-title': 'Automotive Electronics',
'app-card1-desc': 'ADAS, domain controllers, xEV systems, chassis safety & powertrain, surround view systems, LED lighting control, interior smart lighting, infotainment clusters.',
'app-card2-title': 'AI & Computing',
'app-card2-desc': 'AI accelerators, data center servers, high-performance computing centers, edge gateways, HBM memory, NPU, liquid-cooled clusters, cloud training chips.',
'app-card3-title': 'Power & Energy',
'app-card3-desc': 'PV inverters, wind turbine controllers, super charging stations, UPS, BMS, digital power modules, smart grid terminals, power-specific optical modules.',
'app-card4-title': 'Industrial Electronics',
'app-card4-desc': 'Motor drives, PLCs, industrial PCs, data acquisition modules, embedded control boards, industrial displays, precision instruments, industrial Ethernet, laser ranging, machine vision cameras.',
'app-card5-title': 'Communications',
'app-card5-desc': 'Macro/small cells, optical transport equipment, optical modules, routers, satellite terminals, base station RF modules, switches, industrial IoT gateways, edge access points.',
'app-card6-title': 'Medical Electronics',
'app-card6-desc': 'Digital ultrasound, patient monitors, AED defibrillators, high-precision analyzers, ultrasound diagnostic systems, surgical robots, wearable devices, imaging motherboards, high-speed ADC boards, MRI modules.',
'app-card7-title': 'Specialty Fields',
'app-card7-desc': 'Radiation-hardened aerospace payloads, wide-temperature industrial controllers, high-reliability signal chains, airborne communications, radar signal processing, rugged embedded computers, high-precision navigation modules, extreme environment power supplies.',
'app-card8-title': 'Consumer Electronics',
'app-card8-desc': 'Smart wearables, action cameras, portable outdoor power stations, AI companion robots, AR/VR headsets, smart home, drones, game console controllers, intelligent sensing modules.',

// 解决方案
'sol-section-title': 'Solutions',
'sol-section-subtitle1': 'Full-Process Technical Closed-Loop Architecture',
'sol-section-subtitle2': 'Driving Digital Transformation',

// 方案1 - 汽车照明
'sol1-badge': 'AUTOMOTIVE LIGHTING',
'sol1-subtitle': 'LITIX™ Drivers & Smart Pixel Control',
'sol1-category': 'Intelligence & Safety',
'sol1-title': 'Smart Automotive LED Lighting Systems',
'sol1-desc': 'Using high-precision driving technology to give road lighting "emotion" and "interaction". Our solution not only improves nighttime driving safety but also redefines exterior language through adaptive pixel control.',
'sol1-feature1-title': 'Adaptive Pixel Control',
'sol1-feature1-desc': 'Enables dynamic light matrix control.',
'sol1-feature2-title': 'High-Efficiency Driver Architecture',
'sol1-feature2-desc': 'LITIX™ Power series ultimate efficiency.',
'sol1-feature3-title': 'Reliable Power Supply',
'sol1-feature3-desc': 'Automotive MOSFETs for stable operation.',
'sol1-feature4-title': 'Highly Integrated Design',
'sol1-feature4-desc': 'Significantly optimizes PCB space.',
'sol1-footer-label': 'Core Value:',
'sol1-footer-value': 'AEC-Q100 compliant, supports headlights and ambient lighting.',

// 方案2 - 工业边缘计算
'sol2-badge': 'INDUSTRIAL AI',
'sol2-subtitle': 'Edge Computing Driven Industry 4.0 Closed Loop',
'sol2-category': 'Smart Manufacturing',
'sol2-title': 'Industrial Sensing & Edge Computing Center',
'sol2-desc': 'Breaking the boundaries of traditional sensors, deploying AI algorithms to the production site. Achieve millisecond-level real-time anomaly detection and predictive maintenance, ensuring uninterrupted production lines.',
'sol2-feature1-title': 'Low-Latency Edge Computing',
'sol2-feature1-desc': 'Local real-time data processing.',
'sol2-feature2-title': 'Multi-Sensor Fusion',
'sol2-feature2-desc': 'Builds digital twin foundation.',
'sol2-feature3-title': 'AI Predictive Maintenance',
'sol2-feature3-desc': 'Preventive replacement of critical components.',
'sol2-feature4-title': 'Industrial Connectivity Protocols',
'sol2-feature4-desc': 'Supports OPC-UA and TSN.',
'sol2-footer-label': 'Applications:',
'sol2-footer-value': 'Smart factories, high-precision collaborative robots.',

// 方案3 - 新能源动力
'sol3-badge': 'EV POWERTRAIN',
'sol3-subtitle': 'Extreme Power Density for Green Mobility',
'sol3-category': 'Electrification',
'sol3-title': 'New Energy Powertrain System Solutions',
'sol3-desc': 'By optimizing OBC, DC/DC, and traction inverters, significantly reduces system weight, enhances EV range and charging speed.',
'sol3-feature1-title': 'High-Efficiency OBC',
'sol3-feature1-desc': 'Wide-bandgap semiconductor design.',
'sol3-feature2-title': 'High-Power Inverter Control',
'sol3-feature2-desc': 'Improves vehicle torque response.',
'sol3-feature3-title': 'System-Level Weight Reduction',
'sol3-feature3-desc': 'Contributes to excellent power-to-weight ratio.',
'sol3-feature4-title': 'Full-Stack Sensor Support',
'sol3-feature4-desc': 'High-reliability powertrain feedback.',
'sol3-footer-label': 'Key Technologies:',
'sol3-footer-value': 'SiC/GaN integration, supports 800V architecture.',

// 方案4 - 数据中心
'sol4-badge': 'AI DATA CENTER',
'sol4-subtitle': 'Pursuing "Zero Loss" from Grid to Chip',
'sol4-category': 'Sustainability',
'sol4-title': 'Data Center & AI Compute Foundation',
'sol4-desc': 'Leveraging mastery of Si, SiC, and GaN technologies to provide stable, efficient green energy links for global AI factories, reducing PUE losses.',
'sol4-feature1-title': '48V Power Distribution',
'sol4-feature1-desc': 'Significantly reduces rack losses.',
'sol4-feature2-title': 'High-Performance Compute Power',
'sol4-feature2-desc': 'High current, ultra-fast dynamic response.',
'sol4-feature3-title': 'Green PSU Design',
'sol4-feature3-desc': 'Efficiency up to 98%+.',
'sol4-feature4-title': 'Hardware-Level Secure Storage',
'sol4-feature4-desc': 'Ensures compute node integrity.',
'sol4-footer-label': 'Tech Closed Loop:',
'sol4-footer-value': 'Covers ACDC/DCDC conversion, reduces OPEX.',

// 方案5 - 医疗影像
'sol5-badge': 'MEDICAL IMAGING',
'sol5-subtitle': 'Millimeter-Precision Digital Radiography & Therapy',
'sol5-category': 'Life Science',
'sol5-title': 'Digital Radiography & Medical Imaging',
'sol5-desc': 'Provides clinical-grade image sensors and high-precision ADC solutions. Supports full-series device design from mobile X-ray to high-end CT.',
'sol5-feature1-title': 'Radiography-Grade Image Sensing',
'sol5-feature1-desc': 'Ultra-low noise, high dynamic range.',
'sol5-feature2-title': 'Custom SoC/SiP',
'sol5-feature2-desc': 'Integrated front-end signal processing.',
'sol5-feature3-title': 'Medical-Grade AFE Interface',
'sol5-feature3-desc': 'Precise bio-signal acquisition.',
'sol5-feature4-title': 'Long Lifecycle Support',
'sol5-feature4-desc': 'Ensures 15-20 year stable supply.',
'sol5-footer-label': 'Compliance Foundation:',
'sol5-footer-value': 'ISO 13485 compliant, supports long-term approvals.',

// 方案6 - 通信 FPGA
'sol6-badge': 'TELECOM FPGA',
'sol6-subtitle': 'Robust Communication Solutions for Extreme Outdoor Environments',
'sol6-category': 'Connectivity',
'sol6-title': 'Communication FPGA Platform Power Management',
'sol6-desc': 'Provides Smart Power Stage (SPS) for 5G and wireless infrastructure, ensuring excellent thermal performance and power stability in extreme outdoor environments.',
'sol6-feature1-title': 'Smart Multiphase Drive',
'sol6-feature1-desc': 'Meets high-current transient demands.',
'sol6-feature2-title': 'Compact Thermal Design',
'sol6-feature2-desc': 'Improves layout density and thermal management.',
'sol6-feature3-title': 'Reconfigurable Power Rails',
'sol6-feature3-desc': 'Adapts to evolving 5G standards.',
'sol6-feature4-title': 'Carrier-Grade Reliability',
'sol6-feature4-desc': 'Built-in robust anti-interference protection.',
'sol6-footer-label': 'Applications:',
'sol6-footer-value': 'Base station AAU/BBU, satellite links.',

// 方案7 - BMS
'sol7-badge': 'AUTOMOTIVE BMS',
'sol7-subtitle': 'ASIL-D Full-Stack Battery Safety Monitoring',
'sol7-category': 'Battery Safety',
'sol7-title': 'Automotive BMS',
'sol7-desc': 'Achieves full-link monitoring from cell to pack, ensures electrical safety via isolated communication, optimizes battery lifecycle value.',
'sol7-feature1-title': 'ASIL-D Functional Safety',
'sol7-feature1-desc': 'Highest safety certification level.',
'sol7-feature2-title': 'Precise SoC/SoH Algorithms',
'sol7-feature2-desc': 'Real-time battery health monitoring.',
'sol7-feature3-title': 'Isolated Communication Topology',
'sol7-feature3-desc': 'Supports ISO-UART and wireless BLE.',
'sol7-feature4-title': 'Multi-Voltage Platform Compatibility',
'sol7-feature4-desc': 'Covers 48V to 800V systems.',
'sol7-footer-label': 'Future Outlook:',
'sol7-footer-value': 'Supports battery passport & carbon footprint tracking.',

// 服务客户类型
'client-main-title': 'WHO WE SERVE',
'client-subtitle': 'Full-Lifecycle Technical Empowerment, Bridging Chip Manufacturers and End Applications',
'client1-title': 'OEM/ODM Leaders',
'client1-desc': 'Serving manufacturing giants with large-scale production capabilities. Providing high-reliability pre-installation material assurance, global supply chain coordination, and rigorous quality traceability to ensure stable production lines under high-frequency delivery.',
'client2-title': 'Solution Providers & IDH',
'client2-desc': 'Serving design houses focused on technology output. Through original reference design authorization and underlying algorithm support, assisting engineers in optimal selection at project inception, reducing secondary development risks.',
'client3-title': 'Vertical Industry Leaders',
'client3-desc': 'Focusing on high-precision instruments, high-performance power, and medical systems. Supporting their pursuit of Ultimate performance with long-lifecycle supply commitments and validation schemes for harsh environments.',
'client4-title': 'Growth-Stage Startups',
'client4-desc': 'Empowering early R&D teams in robotics, low-altitude economy, and frontier hardware. Providing flexible small-batch procurement and expert technical advisory services to accelerate products from demo to mass production.',

// 领域专业性洞察
'insight-title': 'Domain Expertise Insights',
'insight-subtitle': 'Deep Understanding of Chip Architectures Across Industries, Anticipating and Mitigating Supply Chain Risks',
'insight1-tag': 'Automotive',
'insight1-title': 'Automotive Electronics',
'insight1-challenge-label': '● Industry Challenges',
'insight1-challenge-desc': 'Long lead time fluctuations for automotive MCUs/power devices; AEC-Q100 certification batch risks; structural tightness in SiC/IGBT capacity.',
'insight1-support-label': '○ Specialized Support',
'insight1-support-desc': 'Integrating original and authorized resources, establishing batch-traceable spot pools, providing lead time hedging for power and BMS materials.',
'insight2-tag': 'AI Infrastructure',
'insight2-title': 'AI & Computing',
'insight2-challenge-label': '● Industry Challenges',
'insight2-challenge-desc': 'Cyclical fluctuations in GPU/HBM resources; power architecture changes with 48V upgrade; unstable supply/demand for FPGA high-speed interfaces.',
'insight2-support-label': '○ Specialized Support',
'insight2-support-desc': 'Leveraging server-grade power and high-speed storage resources, establishing rapid allocation and safety stock strategies for core compute and power materials.',
'insight3-tag': 'Industrial',
'insight3-title': 'Industrial Electronics',
'insight3-challenge-label': '● Industry Challenges',
'insight3-challenge-desc': 'Long lifecycle assurance for industrial MCUs; shortage risks for isolators and industrial PHYs; late EOL warnings for older models.',
'insight3-support-label': '○ Specialized Support',
'insight3-support-desc': 'Building industrial long-tail model database, providing EOL warnings, replacement matching, and small-batch long-term stable supply support.',
'insight4-tag': 'Energy & Power',
'insight4-title': 'Power & Energy',
'insight4-challenge-label': '● Industry Challenges',
'insight4-challenge-desc': 'Uneven capacity allocation for SiC/GaN modules; price volatility for BMS and power driver ICs; device replacement due to 800V platform upgrades.',
'insight4-support-label': '○ Specialized Support',
'insight4-support-desc': 'Consolidating power device resources and regional inventory to provide lead time buffer solutions for inverters and energy storage platforms.',
'insight5-tag': 'Medical',
'insight5-title': 'Medical Electronics',
'insight5-challenge-label': '● Industry Challenges',
'insight5-challenge-desc': 'Long lifecycle supply requirements (10-20 years); high concentration of high-precision ADC/AFE part numbers; uncontrollable lead times for high-reliability memory.',
'insight5-support-label': '○ Specialized Support',
'insight5-support-desc': 'Establishing stable supply networks for medical-grade key models, supporting batch consistency traceability, and providing long-term stocking plans for regulatory approvals.',
'insight6-tag': 'Aero-Defense',
'insight6-title': 'High-Reliability Specialty',
'insight6-challenge-label': '● Industry Challenges',
'insight6-challenge-desc': 'Extreme performance constraints like radiation hardness; pressure for localization substitution; sustained supply risks for legacy models.',
'insight6-support-label': '○ Specialized Support',
'insight6-support-desc': 'Screening global aerospace-grade resources, supporting third-party authoritative testing, providing up to 20 years of batch consistency traceability and assurance.',

// 典型客户
'partners-title': 'KEY CLIENTS',

// ========= about.html =========
// 页面标题
'page-about-title': 'About LimChip Co., LTD | Electronic Components Distributor',

// Hero
'about-hero-title': 'About Us',
'about-hero-subtitle': 'Chip Distributor ▚ Delivering Value',

// 公司概况
'about-overview-tag': 'SINCE 2016',
'about-overview-title': '❍Electronic Components Distributor',
'about-overview-text1': 'LimChip (Shenzhen) Technology Co., Ltd. was founded in 2016 as a professional electronic components distributor. We focus on providing high-quality, reliable chip products and supply chain solutions to global customers.',
'about-overview-text2': 'Headquartered in Shenzhen, China, leveraging the complete electronic industry chain advantages of the Pearl River Delta, we have established long-term stable partnerships with world-renowned chip manufacturers. Our product lines cover microcontrollers, memory chips, power devices, analog chips, and more.',

// 企业使命
'about-mission-label': 'Our Mission',
'about-mission-slogan': 'GLOBAL CONNECTIVITY · EMPOWERING INNOVATION · SUPPLY SECURITY',
'about-mission-desc': 'We are committed to building a solid bridge between chip manufacturers and electronics manufacturers. Through excellent supply chain services, we assist customers in accurately acquiring core components, mitigating shortage risks, ensuring supply chain security, and jointly driving the development of smart technology.',

// 统计数据
'about-stat1-txt': 'Years of Experience',
'about-stat2-txt': 'Product Lines',
'about-stat3-txt': 'Clients Served',
'about-stat4-txt': 'Part Numbers',

// 核心价值观
'about-values-title': 'Core Values',
'about-values-subtitle': 'Core Values · The Foundation for Sustainable Growth',
'about-value1-title': 'Quality First',
'about-value1-desc': 'Establishing a full-process quality tracking system, committing to original genuine products, ensuring every chip withstands rigorous inspection.',
'about-value2-title': 'Agile Response',
'about-value2-desc': 'Professional team collaboration, rapid response to global inquiries, providing timely technical support and supply chain assurance.',
'about-value3-title': 'Integrity & Win-Win',
'about-value3-desc': 'Upholding highly transparent business principles, building deep mutual trust and long-term strategic partnerships with manufacturers and customers.',
'about-value4-title': 'Value Co-Creation',
'about-value4-desc': 'Going beyond transactional relationships, creating supply chain premium space for customers through digital selection support and flexible logistics solutions.',

// 发展历程
'about-history-title': 'Development History',
'about-history-subtitle': 'Development Path · Focused Cultivation',
'about-history-year1': '2015',
'about-history-title1': 'Initial Exploration · Deep Cultivation',
'about-history-desc1': 'The founding team officially entered the electronic components distribution field, accumulating the first batch of core channels and industry know-how, laying a solid foundation for the future establishment of LimChip.',
'about-history-year2': '2016',
'about-history-title2': 'Incorporation · Official Launch',
'about-history-desc2': 'LimChip was officially established in Shenzhen. From the outset, the core principle of "original genuine products" was established, rooting in the electronic components distribution field and beginning standardized operations.',
'about-history-year3': '2018',
'about-history-title3': 'Channel Expansion · Goals Achieved',
'about-history-desc3': 'Opened up channels, operating over 20+ brands; the team gradually established market advantages in channels with international semiconductor giants such as TI, ADI, and Infineon.',
'about-history-year4': '2020',
'about-history-title4': 'Service Upgrade · Supply Chain Empowerment',
'about-history-desc4': 'Introduced ERP management system, established a flexible supply chain management system. Transformed from a single distributor to a comprehensive solution provider offering "one-stop procurement + technical support + inventory management".',
'about-history-year5': '2023',
'about-history-title5': 'Continuous Cultivation · Expanding Influence',
'about-history-desc5': 'Continuously developed various channels, gained bargaining power in major EMS factories | Multi-channel integration expands our service customers and product richness, providing customers with a more transparent and efficient supply chain experience.',
'about-history-year6': '2024-PRESENT',
'about-history-title6': 'Deepening Tracks · Optimization & Upgrade',
'about-history-desc6': 'Deepening vertical industries, committed to becoming the most reliable core supply chain partner in China\'s technology industry.',

// CTA
'about-cta-title': 'INNOVATING TOGETHER',
'about-cta-subtitle': 'Driving rapid innovation through a global supply network.<br>Your strategic partner for high-reliability electronic components.',
'about-cta-btn': 'Contact Us',
'about-cta-trust1': '✓ Fast Response',
'about-cta-trust2': '✓ Original Guarantee',
'about-cta-trust3': '✓ Global Delivery',

// ========= contact.html =========
// 页面标题
'page-contact-title': 'Contact LimChip | RFQ for IC Sourcing & Electronic Components',

// Hero
'contact-hero-title': 'Contact Us',
'contact-hero-subtitle': 'Professional Team ⊙ Contact Anytime',

// 快速询价
'contact-rfq-title': 'RFQ',
'contact-rfq-response': '2-Hour Fast Response',
'contact-rfq-label-name': 'How should we address you?',
'contact-rfq-placeholder-name': 'Name or Company Name *',
'contact-rfq-label-contact': 'How to contact you?',
'contact-rfq-placeholder-contact': 'Phone, Email or WeChat ID *',
'contact-rfq-label-needs': 'Your requirements?',
'contact-rfq-placeholder-needs': 'Part Number, Brand, Quantity, Package... *',
'contact-rfq-submit': 'Get Quote',

// 联系信息
// 联系信息 - 竖排字符（原样保留）
'contact-side-title': 'CONTACT INFO',
'contact-address-label': 'Address',
'contact-address-value': 'Unit 26, 11/F, Enterprise Centre, Sha Tin, Hong Kong',
'contact-phone-label': 'Phone',
'contact-phone-value': '+86 186 8873 3475',
'contact-email-label': 'Email',
'contact-email-value': 'sales@limchip.com',

// 即时通讯
'contact-im-title': 'Instant Messaging',
'contact-im-whatsapp': 'WhatsApp',
'contact-im-skype': 'Skype',
'contact-im-linkedin': 'LinkedIn',
'contact-im-wechat': 'WeChat',


            }

        };

        this.supportedLanguages = ['en', 'zh', 'ru', 'ko', 'es', 'vi'];
        this.languageLabels = {
            en: 'English',
            zh: '中文',
            ru: 'Русский',
            ko: '한국어',
            es: 'Español',
            vi: 'Tiếng Việt'
        };
        this.languageShortLabels = {
            en: 'EN',
            zh: '中',
            ru: 'RU',
            ko: 'KO',
            es: 'ES',
            vi: 'VI'
        };
        this.applyExtendedLanguagePacks();

        

        this.init();

    }

    normalizeLanguage(lang) {
        return ['en', 'zh', 'ru', 'ko', 'es', 'vi'].includes(lang) ? lang : 'en';
    }

    readStoredLanguage() {
        try {
            return localStorage.getItem('limchip-language') || 'en';
        } catch (error) {
            return 'en';
        }
    }

    writeStoredLanguage(lang) {
        try {
            localStorage.setItem('limchip-language', this.normalizeLanguage(lang));
        } catch (error) {
            // Keep the page usable in privacy modes where localStorage is blocked.
        }
    }

    
init() {
        // 等待DOM加载完成绑定点击事件
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }

        // 应用语言设置：翻译内容并确保 html[lang] 正确
        this.updateLanguage();
    }

    bindEvents() {
        const langSwitchers = document.querySelectorAll('.lang-switch, #langToggle');
        langSwitchers.forEach(switcher => {
            this.renderLanguageSwitcher(switcher);
        });

        document.addEventListener('click', (event) => {
            document.querySelectorAll('.lang-toggle-wrapper.is-open').forEach(menu => {
                if (!menu.contains(event.target)) {
                    menu.classList.remove('is-open');
                    menu.setAttribute('aria-expanded', 'false');
                    const panel = menu.querySelector('.lang-menu');
                    if (panel) {
                        ['position', 'top', 'right', 'left', 'width', 'z-index', 'opacity', 'pointer-events', 'transform'].forEach(prop => panel.style.removeProperty(prop));
                    }
                }
            });
        });

        if (window.LIMCHIP_DEBUG) {
            console.log('LanguageManager: 状态就绪，当前语言:', this.currentLang);
        }
    }
	
	
	//语言切换按钮的监听
switchLanguage(newLang) {
    newLang = this.normalizeLanguage(newLang);
    if (newLang === this.currentLang) return;
    this.currentLang = newLang;
    this.writeStoredLanguage(this.currentLang);
    
    // 立即改 lang 属性，CSS 瞬间就会翻转文字
    document.documentElement.lang = newLang;
    
    this.updateLanguage(); // 翻译全文
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
}

    updateLanguage() {
        // 【核心】同步修改根元素 lang 属性，驱动 CSS ::before 伪元素瞬间改字
        document.documentElement.lang = this.getHtmlLang(this.currentLang);
        this.updateLanguageSwitcherLabels();

        // 更新所有带有 data-translate 属性的元素内容
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const text = this.getTranslation(key);
            if (text) {
                // 使用 innerHTML 以支持 HTML 标签（如 <span class="text-accent">）
                if (text.includes('\n')) {
                    element.innerHTML = text.replace(/\n/g, '<br>');
                } else {
                    element.innerHTML = text;
                }
            }
        });

        // 更新页面标题
        const pageTitle = document.querySelector('title[data-translate]');
        if (pageTitle) {
            const title = this.getTranslation(pageTitle.getAttribute('data-translate'));
            if (title) document.title = title;
        }

        // 更新表单占位符
        const placeholders = document.querySelectorAll('[data-translate-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const text = this.getTranslation(key);
            if (text) element.placeholder = text;
        });

        // 特殊处理 Hero 标题
        const heroTitle1 = document.querySelector('[data-translate="hero-title-1"]');
        const heroTitle2 = document.querySelector('[data-translate="hero-title-2"]');
        if (heroTitle1 && heroTitle2) {
            heroTitle1.textContent = this.getTranslation('hero-title-1');
            heroTitle2.textContent = this.getTranslation('hero-title-2');
        }
    }

    getTranslation(key) {
        return (this.translations[this.currentLang] && this.translations[this.currentLang][key])
            || (this.translations.en && this.translations.en[key])
            || '';
    }

    getHtmlLang(lang) {
        return {
            en: 'en',
            zh: 'zh-CN',
            ru: 'ru',
            ko: 'ko',
            es: 'es',
            vi: 'vi'
        }[lang] || 'en';
    }

    renderLanguageSwitcher(switcher) {
        if (switcher.dataset.langReady === 'true') return;
        switcher.dataset.langReady = 'true';
        switcher.setAttribute('role', 'button');
        switcher.setAttribute('aria-haspopup', 'true');
        switcher.setAttribute('aria-expanded', 'false');
        switcher.setAttribute('tabindex', '0');

        let label = switcher.querySelector('#langText, .lang-text');
        if (!label) {
            label = document.createElement('span');
            label.className = 'lang-text';
            switcher.appendChild(label);
        }
        label.textContent = this.languageShortLabels[this.currentLang] || 'EN';

        const menu = document.createElement('div');
        menu.className = 'lang-menu';
        menu.setAttribute('role', 'menu');

        const setMenuOpen = (open) => {
            if (open) {
                window.limchipCloseMobileMenu?.();
                document.querySelectorAll('.nav-part-search.is-open').forEach(search => {
                    search.classList.remove('is-open', 'has-results');
                    const searchToggle = search.querySelector('.nav-search-toggle');
                    const panel = search.querySelector('.nav-search-panel');
                    const results = search.querySelector('.part-search-results, #navPartSearchResults');
                    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
                    if (panel) {
                        ['position', 'top', 'left', 'right', 'width', 'z-index', 'opacity', 'pointer-events', 'transform'].forEach(prop => panel.style.removeProperty(prop));
                    }
                    if (results) results.style.display = 'none';
                });
                document.querySelectorAll('.lang-toggle-wrapper.is-open').forEach(item => {
                    if (item !== switcher) {
                        item.classList.remove('is-open');
                        item.setAttribute('aria-expanded', 'false');
                        const otherMenu = item.querySelector('.lang-menu');
                        if (otherMenu) {
                            ['position', 'top', 'right', 'left', 'width', 'z-index', 'opacity', 'pointer-events', 'transform'].forEach(prop => otherMenu.style.removeProperty(prop));
                        }
                    }
                });
            }
            switcher.classList.toggle('is-open', open);
            switcher.setAttribute('aria-expanded', String(open));
            ['position', 'top', 'right', 'left', 'width', 'z-index', 'opacity', 'pointer-events', 'transform'].forEach(prop => menu.style.removeProperty(prop));
        };

        this.supportedLanguages.forEach(lang => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'lang-option';
            option.dataset.lang = lang;
            option.setAttribute('role', 'menuitem');
            option.textContent = this.languageLabels[lang];
            option.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.switchLanguage(lang);
                setMenuOpen(false);
            });
            menu.appendChild(option);
        });
        switcher.appendChild(menu);

        switcher.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = !switcher.classList.contains('is-open');
            setMenuOpen(isOpen);
        });
        switcher.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMenuOpen(!switcher.classList.contains('is-open'));
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                setMenuOpen(false);
            }
        });
    }

    updateLanguageSwitcherLabels() {
        document.querySelectorAll('#langText, .lang-text').forEach(label => {
            label.textContent = this.languageShortLabels[this.currentLang] || 'EN';
        });
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('is-active', option.dataset.lang === this.currentLang);
        });
    }

    applyExtendedLanguagePacks() {
        const en = this.translations.en || {};
        const packs = {
            ru: {
                'page-home-title': 'LimChip Technology - Профессиональный поставщик электронных компонентов',
                'page-products-title': 'Продукты - LimChip Technology',
                'page-services-title': 'Сервисы цепочки поставок - LimChip Technology',
                'page-apps-title': 'Отраслевые решения - LimChip Technology',
                'page-about-title': 'О нас - LimChip Technology Co., Ltd.',
                'page-contact-title': 'Контакты - LimChip Technology Co., Ltd.',
                'nav-home': 'Главная',
                'nav-products': 'Продукты',
                'nav-services': 'Сервисы',
                'nav-applications': 'Решения',
                'nav-about': 'О нас',
                'nav-contact': 'Контакты',
                'btn-contact': 'Связаться',
                'nav-search-placeholder': 'Поиск по номеру, бренду или категории...',
                'nav-search-no-result': 'Совпадений не найдено.',
                'nav-search-submit-rfq': 'Отправить RFQ',
                'footer-slogan-main': 'Фокус на компонентах ◆ Движение будущего',
                'footer-slogan-sub': 'Ценность · Качество · Сервис',
                'footer-quick-links': 'Быстрые ссылки',
                'footer-contact-title': 'Контакты',
                'footer-contact-phone-fixed': 'Тел:',
                'footer-contact-phone-mobile': 'Моб.:',
                'footer-contact-email': 'Email:',
                'footer-contact-wechat': 'WeChat:',
                'footer-contact-address': 'Офис:',
                'footer-contact-address-val': 'Гонконг ● Китай',
                'footer-bottom-copyright': '© 2026 ◈ LIMCHIP CO. LTD. ◈ Все права защищены',
                'hero-title-all': 'Соединяем глобальные цепочки поставок микросхем',
                'hero-subtitle': 'Обеспечиваем умное будущее',
                'hero-description': 'LimChip поставляет электронные компоненты и решения для глобальных клиентов с акцентом на оригинальные детали, спотовые запасы и надежную цепочку поставок.',
                'hero-btn-more': 'Подробнее',
                'about-year': 'С 2016',
                'about-title-sub': 'ПРОФЕССИОНАЛЬНЫЙ',
                'about-title-main': 'ПОСТАВЩИК <span class="text-accent">КОМПОНЕНТОВ</span>',
                'about-btn-us': 'О нас',
                'stat-clients-p': 'Более',
                'stat-clients-l': 'Клиентов',
                'stat-exp-l': 'Опыт',
                'stat-brands-l': 'Брендов',
                'stat-response-l': 'Ответ',
                'values-title': 'Ключевые преимущества',
                'values-subtitle': 'Комплексная система защиты цепочки поставок',
                'values-card-1-t': 'Гарантия качества',
                'values-card-1-d': 'Оригинальные каналы и прослеживаемость партий.',
                'values-card-2-t': 'Быстрый ответ',
                'values-card-2-d': 'Техническая команда быстро подбирает решения.',
                'values-card-3-t': 'Глобальный поиск',
                'values-card-3-d': 'Решаем задачи дефицитных и редких позиций.',
                'values-stat-1': 'Номера деталей',
                'values-stat-2': 'Стандарты качества',
                'values-stat-3': 'Цифровая цепочка',
                'prod-cat-title': 'Продукты',
                'prod-cat-subtitle': 'Ключевые категории электронных компонентов',
                'prod-cat-1-t': 'Интегральные схемы',
                'prod-cat-2-t': 'Силовые устройства',
                'prod-cat-3-t': 'Память',
                'prod-cat-4-t': 'Разъемы',
                'prod-cat-5-t': 'Пассивные компоненты',
                'btn-more-detail': 'Подробнее',
                'brand-title': 'Линейки брендов',
                'btn-more': 'Еще',
                'ind-title': 'Отраслевые решения',
                'ind-card-1-t': 'Автоэлектроника',
                'ind-card-2-t': 'Промышленность',
                'ind-card-3-t': 'Телеком',
                'ind-card-4-t': 'Медицина',
                'ind-card-5-t': 'Потребительская электроника',
                'ind-card-6-t': 'Новая энергия',
                'flow-title': 'Стандартизированный процесс',
                'flow-step-1-t': 'Анализ запроса',
                'flow-step-2-t': 'Проверка решения',
                'flow-step-3-t': 'Логистика',
                'flow-step-4-t': 'Поддержка',
                'cta-title': 'Получите эффективную поддержку поставок компонентов',
                'cta-desc': 'Для дефицитных позиций, EOL-компонентов и долгосрочного снабжения наша команда готова быстро помочь.',
                'cta-btn-submit': '@Отправить RFQ',
                'cta-btn-contact': 'Поддержка',
                'contact-hero-title': 'Контакты',
                'contact-rfq-title': 'Запрос цены',
                'contact-rfq-response': 'Ответ за 2 часа',
                'contact-rfq-label-name': 'Как к вам обращаться?',
                'contact-rfq-placeholder-name': 'Имя или компания *',
                'contact-rfq-label-contact': 'Как связаться?',
                'contact-rfq-placeholder-contact': 'Телефон, Email или WeChat *',
                'contact-rfq-label-needs': 'Ваш запрос?',
                'contact-rfq-placeholder-needs': 'Модель, бренд, количество...',
                'contact-rfq-submit': 'Получить цену',
                'contact-side-title': 'КОНТАКТЫ',
                'contact-address-label': 'Адрес',
                'contact-phone-label': 'Телефон',
                'contact-email-label': 'Email',
                'contact-im-title': 'Мессенджеры'
            },
            ko: {
                'page-home-title': 'LimChip Technology - 전문 전자부품 공급업체',
                'page-products-title': '제품 - LimChip Technology',
                'page-services-title': '공급망 서비스 - LimChip Technology',
                'page-apps-title': '산업 솔루션 - LimChip Technology',
                'page-about-title': '회사 소개 - LimChip Technology Co., Ltd.',
                'page-contact-title': '문의하기 - LimChip Technology Co., Ltd.',
                'nav-home': '홈',
                'nav-products': '제품',
                'nav-services': '서비스',
                'nav-applications': '솔루션',
                'nav-about': '회사 소개',
                'nav-contact': '문의',
                'btn-contact': '문의하기',
                'nav-search-placeholder': '품번, 브랜드 또는 카테고리 검색...',
                'nav-search-no-result': '일치하는 품번이 없습니다.',
                'nav-search-submit-rfq': 'RFQ 보내기',
                'footer-slogan-main': '부품에 집중 ◆ 미래를 구동',
                'footer-slogan-sub': '가치 · 품질 · 서비스',
                'footer-quick-links': '빠른 링크',
                'footer-contact-title': '문의',
                'footer-contact-phone-fixed': '전화:',
                'footer-contact-phone-mobile': '모바일:',
                'footer-contact-email': '이메일:',
                'footer-contact-wechat': 'WeChat:',
                'footer-contact-address': '본사:',
                'footer-contact-address-val': '홍콩 ● 중국',
                'footer-bottom-copyright': '© 2026 ◈ LIMCHIP CO. LTD. ◈ All Rights Reserved',
                'hero-title-all': '글로벌 칩 공급망을 연결합니다',
                'hero-subtitle': '스마트한 미래를 지원합니다',
                'hero-description': 'LimChip은 정품 부품, 현물 재고, 안정적인 공급망 서비스를 중심으로 글로벌 고객에게 전자부품 솔루션을 제공합니다.',
                'hero-btn-more': '더 알아보기',
                'about-year': '2016년부터',
                'about-title-sub': '전문',
                'about-title-main': '전자부품 <span class="text-accent">공급업체</span>',
                'about-btn-us': '회사 소개',
                'stat-clients-p': '이상',
                'stat-clients-l': '고객',
                'stat-exp-l': '경험',
                'stat-brands-l': '협력 브랜드',
                'stat-response-l': '응답 시간',
                'values-title': '핵심 강점',
                'values-subtitle': '전방위 공급망 보장 체계',
                'values-card-1-t': '품질 보장',
                'values-card-1-d': '정품 채널과 배치 추적으로 안정적 납품.',
                'values-card-2-t': '빠른 대응',
                'values-card-2-d': '기술팀이 신속하게 소싱 방안을 제공합니다.',
                'values-card-3-t': '글로벌 소싱',
                'values-card-3-d': '부족 자재와 장기 수요를 지원합니다.',
                'values-stat-1': '품번',
                'values-stat-2': '품질 기준',
                'values-stat-3': '디지털 공급망',
                'prod-cat-title': '제품 포트폴리오',
                'prod-cat-subtitle': '핵심 전자부품 분야를 폭넓게 지원',
                'prod-cat-1-t': '집적회로(IC)',
                'prod-cat-2-t': '전력 반도체',
                'prod-cat-3-t': '메모리',
                'prod-cat-4-t': '커넥터',
                'prod-cat-5-t': '수동 부품',
                'btn-more-detail': '자세히',
                'brand-title': '브랜드 라인',
                'btn-more': '더 보기',
                'ind-title': '산업 솔루션',
                'ind-card-1-t': '자동차',
                'ind-card-2-t': '산업 제어',
                'ind-card-3-t': '통신',
                'ind-card-4-t': '의료 전자',
                'ind-card-5-t': '소비자 전자',
                'ind-card-6-t': '신에너지',
                'flow-title': '표준화 프로세스',
                'flow-step-1-t': '요구 분석',
                'flow-step-2-t': '솔루션 검증',
                'flow-step-3-t': '글로벌 물류',
                'flow-step-4-t': '사후 지원',
                'cta-title': '효율적인 칩 공급망 서비스를 받아보세요',
                'cta-desc': '긴급 소싱, 단종 부품, 장기 공급 계획까지 LimChip 팀이 빠르게 지원합니다.',
                'cta-btn-submit': '@RFQ 제출',
                'cta-btn-contact': '지원 문의',
                'contact-hero-title': '문의하기',
                'contact-rfq-title': '견적 요청',
                'contact-rfq-response': '2시간 빠른 응답',
                'contact-rfq-label-name': '어떻게 불러드릴까요?',
                'contact-rfq-placeholder-name': '이름 또는 회사명 *',
                'contact-rfq-label-contact': '연락 방법은?',
                'contact-rfq-placeholder-contact': '전화, 이메일 또는 WeChat *',
                'contact-rfq-label-needs': '필요 사항은?',
                'contact-rfq-placeholder-needs': '품번, 브랜드, 수량...',
                'contact-rfq-submit': '견적 받기',
                'contact-side-title': '연락처',
                'contact-address-label': '주소',
                'contact-phone-label': '전화',
                'contact-email-label': '이메일',
                'contact-im-title': '메신저'
            },
            es: {
                'page-home-title': 'LimChip Technology - Distribuidor profesional de componentes electrónicos',
                'page-products-title': 'Productos - LimChip Technology',
                'page-services-title': 'Servicios de cadena de suministro - LimChip Technology',
                'page-apps-title': 'Aplicaciones - LimChip Technology',
                'page-about-title': 'Sobre nosotros - LimChip Technology Co., Ltd.',
                'page-contact-title': 'Contacto - LimChip Technology Co., Ltd.',
                'nav-home': 'Inicio',
                'nav-products': 'Productos',
                'nav-services': 'Servicios',
                'nav-applications': 'Aplicaciones',
                'nav-about': 'Nosotros',
                'nav-contact': 'Contacto',
                'btn-contact': 'Contactar',
                'nav-search-placeholder': 'Buscar número de parte, marca o categoría...',
                'nav-search-no-result': 'No se encontró ninguna pieza.',
                'nav-search-submit-rfq': 'Enviar RFQ',
                'footer-slogan-main': 'Enfoque en chips ◆ Impulso al futuro',
                'footer-slogan-sub': 'Valor · Calidad · Servicio',
                'footer-quick-links': 'Enlaces rápidos',
                'footer-contact-title': 'Contacto',
                'footer-contact-phone-fixed': 'Tel:',
                'footer-contact-phone-mobile': 'Móvil:',
                'footer-contact-email': 'Email:',
                'footer-contact-wechat': 'WeChat:',
                'footer-contact-address': 'Sede:',
                'footer-contact-address-val': 'Hong Kong ● China',
                'footer-bottom-copyright': '© 2026 ◈ LIMCHIP CO. LTD. ◈ Todos los derechos reservados',
                'hero-title-all': 'Conectamos la cadena global de chips',
                'hero-subtitle': 'Impulsamos el futuro inteligente',
                'hero-description': 'LimChip ofrece componentes electrónicos originales, inventario disponible y servicios de cadena de suministro para clientes globales.',
                'hero-btn-more': 'Más información',
                'about-year': 'Desde 2016',
                'about-title-sub': 'PROVEEDOR',
                'about-title-main': 'DE <span class="text-accent">COMPONENTES</span>',
                'about-btn-us': 'Sobre nosotros',
                'stat-clients-p': 'Más de',
                'stat-clients-l': 'Clientes',
                'stat-exp-l': 'Experiencia',
                'stat-brands-l': 'Marcas',
                'stat-response-l': 'Respuesta',
                'values-title': 'Ventajas clave',
                'values-subtitle': 'Sistema integral de garantía de suministro',
                'values-card-1-t': 'Calidad garantizada',
                'values-card-1-d': 'Canales originales y trazabilidad por lote.',
                'values-card-2-t': 'Respuesta rápida',
                'values-card-2-d': 'Equipo técnico listo para apoyar su selección.',
                'values-card-3-t': 'Sourcing global',
                'values-card-3-d': 'Apoyo para piezas escasas y de ciclo largo.',
                'values-stat-1': 'Números de parte',
                'values-stat-2': 'Estándares de calidad',
                'values-stat-3': 'Cadena digital',
                'prod-cat-title': 'Portafolio',
                'prod-cat-subtitle': 'Cobertura de categorías clave de componentes',
                'prod-cat-1-t': 'Circuitos integrados',
                'prod-cat-2-t': 'Dispositivos de potencia',
                'prod-cat-3-t': 'Memoria',
                'prod-cat-4-t': 'Conectores',
                'prod-cat-5-t': 'Pasivos',
                'btn-more-detail': 'Más detalles',
                'brand-title': 'Marcas',
                'btn-more': 'Más',
                'ind-title': 'Soluciones por industria',
                'ind-card-1-t': 'Automoción',
                'ind-card-2-t': 'Control industrial',
                'ind-card-3-t': 'Telecomunicaciones',
                'ind-card-4-t': 'Electrónica médica',
                'ind-card-5-t': 'Consumo',
                'ind-card-6-t': 'Nueva energía',
                'flow-title': 'Proceso estandarizado',
                'flow-step-1-t': 'Análisis de requisitos',
                'flow-step-2-t': 'Validación',
                'flow-step-3-t': 'Logística global',
                'flow-step-4-t': 'Soporte',
                'cta-title': 'Obtenga soporte eficiente para su cadena de suministro',
                'cta-desc': 'Para piezas escasas, EOL y compras a largo plazo, nuestro equipo está listo para responder rápidamente.',
                'cta-btn-submit': '@Enviar RFQ',
                'cta-btn-contact': 'Contactar soporte',
                'contact-hero-title': 'Contacto',
                'contact-rfq-title': 'Solicitud de cotización',
                'contact-rfq-response': 'Respuesta rápida en 2 horas',
                'contact-rfq-label-name': '¿Cómo debemos llamarle?',
                'contact-rfq-placeholder-name': 'Nombre o empresa *',
                'contact-rfq-label-contact': '¿Cómo contactarle?',
                'contact-rfq-placeholder-contact': 'Teléfono, email o WeChat *',
                'contact-rfq-label-needs': '¿Qué necesita?',
                'contact-rfq-placeholder-needs': 'Parte, marca, cantidad...',
                'contact-rfq-submit': 'Solicitar precio',
                'contact-side-title': 'CONTACTO',
                'contact-address-label': 'Dirección',
                'contact-phone-label': 'Teléfono',
                'contact-email-label': 'Email',
                'contact-im-title': 'Mensajería'
            },
            vi: {
                'page-home-title': 'LimChip Technology - Nhà cung cấp linh kiện điện tử chuyên nghiệp',
                'page-products-title': 'Sản phẩm - LimChip Technology',
                'page-services-title': 'Dịch vụ chuỗi cung ứng - LimChip Technology',
                'page-apps-title': 'Ứng dụng ngành - LimChip Technology',
                'page-about-title': 'Về chúng tôi - LimChip Technology Co., Ltd.',
                'page-contact-title': 'Liên hệ - LimChip Technology Co., Ltd.',
                'nav-home': 'Trang chủ',
                'nav-products': 'Sản phẩm',
                'nav-services': 'Dịch vụ',
                'nav-applications': 'Ứng dụng',
                'nav-about': 'Giới thiệu',
                'nav-contact': 'Liên hệ',
                'btn-contact': 'Liên hệ ngay',
                'nav-search-placeholder': 'Tìm mã linh kiện, thương hiệu hoặc danh mục...',
                'nav-search-no-result': 'Không tìm thấy linh kiện phù hợp.',
                'nav-search-submit-rfq': 'Gửi RFQ',
                'footer-slogan-main': 'Tập trung linh kiện ◆ Dẫn dắt tương lai',
                'footer-slogan-sub': 'Giá trị · Chất lượng · Dịch vụ',
                'footer-quick-links': 'Liên kết nhanh',
                'footer-contact-title': 'Liên hệ',
                'footer-contact-phone-fixed': 'ĐT:',
                'footer-contact-phone-mobile': 'Di động:',
                'footer-contact-email': 'Email:',
                'footer-contact-wechat': 'WeChat:',
                'footer-contact-address': 'Trụ sở:',
                'footer-contact-address-val': 'Hồng Kông ● Trung Quốc',
                'footer-bottom-copyright': '© 2026 ◈ LIMCHIP CO. LTD. ◈ Bảo lưu mọi quyền',
                'hero-title-all': 'Kết nối chuỗi cung ứng chip toàn cầu',
                'hero-subtitle': 'Thúc đẩy tương lai thông minh',
                'hero-description': 'LimChip cung cấp linh kiện điện tử chính hãng, hàng tồn kho sẵn có và giải pháp chuỗi cung ứng cho khách hàng toàn cầu.',
                'hero-btn-more': 'Tìm hiểu thêm',
                'about-year': 'Từ 2016',
                'about-title-sub': 'NHÀ CUNG CẤP',
                'about-title-main': 'LINH KIỆN <span class="text-accent">ĐIỆN TỬ</span>',
                'about-btn-us': 'Giới thiệu',
                'stat-clients-p': 'Hơn',
                'stat-clients-l': 'Khách hàng',
                'stat-exp-l': 'Kinh nghiệm',
                'stat-brands-l': 'Thương hiệu',
                'stat-response-l': 'Phản hồi',
                'values-title': 'Lợi thế cốt lõi',
                'values-subtitle': 'Hệ thống đảm bảo chuỗi cung ứng toàn diện',
                'values-card-1-t': 'Đảm bảo chất lượng',
                'values-card-1-d': 'Nguồn chính hãng và truy xuất theo lô.',
                'values-card-2-t': 'Phản hồi nhanh',
                'values-card-2-d': 'Đội ngũ kỹ thuật hỗ trợ chọn linh kiện.',
                'values-card-3-t': 'Tìm nguồn toàn cầu',
                'values-card-3-d': 'Hỗ trợ linh kiện khan hiếm và dài hạn.',
                'values-stat-1': 'Mã linh kiện',
                'values-stat-2': 'Tiêu chuẩn chất lượng',
                'values-stat-3': 'Chuỗi cung ứng số',
                'prod-cat-title': 'Danh mục sản phẩm',
                'prod-cat-subtitle': 'Bao phủ các nhóm linh kiện điện tử chính',
                'prod-cat-1-t': 'Mạch tích hợp',
                'prod-cat-2-t': 'Linh kiện công suất',
                'prod-cat-3-t': 'Bộ nhớ',
                'prod-cat-4-t': 'Đầu nối',
                'prod-cat-5-t': 'Linh kiện thụ động',
                'btn-more-detail': 'Chi tiết',
                'brand-title': 'Dòng thương hiệu',
                'btn-more': 'Thêm',
                'ind-title': 'Giải pháp ngành',
                'ind-card-1-t': 'Ô tô',
                'ind-card-2-t': 'Điều khiển công nghiệp',
                'ind-card-3-t': 'Viễn thông',
                'ind-card-4-t': 'Y tế điện tử',
                'ind-card-5-t': 'Điện tử tiêu dùng',
                'ind-card-6-t': 'Năng lượng mới',
                'flow-title': 'Quy trình tiêu chuẩn',
                'flow-step-1-t': 'Phân tích nhu cầu',
                'flow-step-2-t': 'Xác minh giải pháp',
                'flow-step-3-t': 'Logistics toàn cầu',
                'flow-step-4-t': 'Hỗ trợ sau bán',
                'cta-title': 'Nhận hỗ trợ chuỗi cung ứng linh kiện hiệu quả',
                'cta-desc': 'Đối với linh kiện khan hiếm, EOL và kế hoạch cung ứng dài hạn, đội ngũ của chúng tôi luôn sẵn sàng phản hồi nhanh.',
                'cta-btn-submit': '@Gửi RFQ',
                'cta-btn-contact': 'Liên hệ hỗ trợ',
                'contact-hero-title': 'Liên hệ',
                'contact-rfq-title': 'Yêu cầu báo giá',
                'contact-rfq-response': 'Phản hồi nhanh trong 2 giờ',
                'contact-rfq-label-name': 'Chúng tôi nên gọi bạn là gì?',
                'contact-rfq-placeholder-name': 'Tên hoặc công ty *',
                'contact-rfq-label-contact': 'Liên hệ bằng cách nào?',
                'contact-rfq-placeholder-contact': 'Điện thoại, Email hoặc WeChat *',
                'contact-rfq-label-needs': 'Bạn cần gì?',
                'contact-rfq-placeholder-needs': 'Mã linh kiện, thương hiệu, số lượng...',
                'contact-rfq-submit': 'Nhận báo giá',
                'contact-side-title': 'THÔNG TIN',
                'contact-address-label': 'Địa chỉ',
                'contact-phone-label': 'Điện thoại',
                'contact-email-label': 'Email',
                'contact-im-title': 'Nhắn tin'
            }
        };

        const pagePacks = {
            ru: {
                'products-hero-title': 'Продукты',
                'products-hero-subtitle': 'Гибкая дистрибуция ⧈ Разные каналы ⧈ Широкий выбор',
                'products-section-categories': 'Категории продуктов',
                'products-section-subtitle1': 'Полный охват электронных компонентов',
                'products-section-subtitle2': 'Единая поддержка вашей цепочки поставок',
                'prod-including': 'Включает:',
                'prod-mcu-title': 'Микроконтроллеры и процессоры',
                'prod-mcu-subtitle': 'MCU, MPU и процессоры',
                'prod-asicfpga-title': 'ASIC и FPGA',
                'prod-asicfpga-subtitle': 'Заказные IC и программируемая логика',
                'prod-memory-title': 'Память и накопители',
                'prod-memory-subtitle': 'DRAM, Flash, eMMC и UFS',
                'prod-poweric-title': 'Силовые IC',
                'prod-poweric-subtitle': 'Управление питанием',
                'prod-sensor-title': 'Датчики',
                'prod-sensor-subtitle': 'Комплексные сенсорные решения',
                'prod-automotive-title': 'Автомобильные IC',
                'prod-automotive-subtitle': 'Компоненты AEC-Q',
                'prod-adcdac-title': 'Преобразователи ADC/DAC',
                'prod-adcdac-subtitle': 'Сигнальная цепь и AFE',
                'prod-interface-title': 'Интерфейсные IC',
                'prod-interface-subtitle': 'Связь и интерфейсы',
                'prod-rf-title': 'RF, СВЧ и миллиметровые волны',
                'prod-rf-subtitle': 'RF и высокочастотные решения',
                'prod-discrete-title': 'Силовые дискретные компоненты',
                'prod-discrete-subtitle': 'MOSFET, IGBT, SiC и GaN',
                'prod-connector-title': 'Разъемы',
                'prod-connector-subtitle': 'Разъемы и межсоединения',
                'prod-devtools-title': 'Средства разработки',
                'prod-devtools-subtitle': 'Инструменты и экосистема',
                'brand-main-title': 'Бренды продуктов',
                'brand-global-name': 'Международные бренды',
                'brand-global-desc': 'Поставки от известных полупроводниковых брендов через надежные каналы.',
                'brand-domestic-name': 'Ведущие китайские бренды',
                'brand-domestic-desc': 'Поддержка китайской цепочки поставок и выгодных альтернатив.',
                'quality-title': 'СТРОГАЯ СИСТЕМА КОНТРОЛЯ КАЧЕСТВА',
                'quality-subtitle': 'Трехуровневая проверка помогает поставлять оригинальные компоненты',
                'bom-title-line2': 'Быстрый BOM-сервис',
                'bom-subtitle': 'Отправьте BOM, и инженер по закупкам подготовит решение в течение 2 часов.',
                'network-card-title': 'Глобальные источники · Быстрая доставка',
                'services-hero-title': 'ИНТЕЛЛЕКТУАЛЬНАЯ ЦЕПОЧКА ПОСТАВОК',
                'services-hero-subtitle': 'Контроль качества ◘ Клиент на первом месте',
                'services-qc-main-title': 'КАЧЕСТВО И ГАРАНТИЯ',
                'services-qc-subtitle': 'Комплексная инспекция и строгая система управления для снижения рисков поставок',
                'services-qc-title-1': 'КАЧЕСТВО БЕЗ ДЕФЕКТОВ',
                'services-qc-title-2': 'Полный лабораторный процесс',
                'services-qc-desc': 'Мы проверяем поставщиков и материалы, помогая снизить риски через физические и электрические тесты.',
                'qc-step1-h': 'Проверка внешнего вида',
                'qc-step1-p': 'Проверка маркировки, корпуса и оригинальных этикеток.',
                'qc-step2-h': 'X-Ray контроль структуры',
                'qc-step2-p': 'Сравнение кристалла, рамки выводов и размеров.',
                'qc-step3-h': 'Decap-анализ',
                'qc-step3-p': 'Сравнение внутренних маркировок с исходными данными.',
                'qc-step4-h': 'Электрические и стресс-тесты',
                'qc-step4-p': 'Проверка параметров при разных температурах.',
                'qc-track-check': 'Покрытие проверки',
                'qc-track-origin': 'Прослеживаемость',
                'qc-track-standard': 'Входной контроль',
                'qc-track-service': 'Система качества',
                'services-gsc-primary-title': 'ГЛОБАЛЬНЫЕ КАНАЛЫ ПОСТАВОК',
                'services-gsc-secondary-title': 'Решения для дефицитных микросхем со склада',
                'services-gsc-desc': 'Объединяем излишки OEM, оригинальные каналы и складские ресурсы для быстрого подбора дефицитных позиций.',
                'services-section-services': 'Ключевые сервисы',
                'services-section-services-desc': 'Единый сервис поставок электронных компонентов',
                'services-section-process': 'Процесс сервиса',
                'services-section-process-desc': 'Стандартизованный процесс для стабильного качества',
                'services-section-advantages': 'Преимущества сервиса',
                'services-section-advantages-desc': 'Почему выбирают нас',
                'apps-hero-title': 'Отраслевые решения',
                'apps-hero-subtitle': 'Глубокая экспертиза ➽ Создание ценности',
                'apps-section-title': 'Области применения',
                'apps-section-subtitle1': 'Фокус на ключевых полупроводниковых направлениях',
                'apps-section-subtitle2': 'Точная поддержка ценных сценариев применения',
                'app-card1-title': 'Автомобильная электроника',
                'app-card2-title': 'AI и вычисления',
                'app-card3-title': 'Энергетика',
                'app-card4-title': 'Промышленная электроника',
                'app-card5-title': 'Связь',
                'app-card6-title': 'Медицинская электроника',
                'app-card7-title': 'Специальные области',
                'app-card8-title': 'Потребительская электроника',
                'sol-section-title': 'Решения',
                'sol-section-subtitle1': 'Полный технический контур',
                'sol-section-subtitle2': 'Поддержка цифровой трансформации',
                'client-main-title': 'КОГО МЫ ОБСЛУЖИВАЕМ',
                'insight-title': 'Отраслевые экспертные идеи',
                'partners-title': 'КЛЮЧЕВЫЕ КЛИЕНТЫ',
                'about-hero-title': 'О нас',
                'about-hero-subtitle': 'Дистрибьютор микросхем ▚ Создаем ценность',
                'about-overview-title': '❍Дистрибьютор электронных компонентов',
                'about-mission-label': 'Наша миссия',
                'about-mission-slogan': 'ГЛОБАЛЬНАЯ СВЯЗЬ · ИННОВАЦИИ · БЕЗОПАСНОСТЬ ПОСТАВОК',
                'about-values-title': 'Ценности',
                'about-values-subtitle': 'Ценности · Основа устойчивого роста',
                'about-history-title': 'История развития',
                'about-history-subtitle': 'Путь развития · Фокус и рост',
                'about-cta-title': 'ИННОВАЦИИ ВМЕСТЕ',
                'about-cta-btn': 'Связаться',
                'contact-hero-subtitle': 'Профессиональная команда всегда готова помочь'
            },
            ko: {
                'products-hero-title': '제품',
                'products-hero-subtitle': '하이브리드 유통 ⧈ 다양한 채널 ⧈ 폭넓은 제품',
                'products-section-categories': '제품 카테고리',
                'products-section-subtitle1': '전자부품 전 영역 지원',
                'products-section-subtitle2': '공급망을 위한 원스톱 지원',
                'prod-including': '포함:',
                'prod-mcu-title': '마이크로컨트롤러 및 프로세서',
                'prod-mcu-subtitle': 'MCU, MPU 및 프로세서',
                'prod-asicfpga-title': 'ASIC 및 FPGA',
                'prod-asicfpga-subtitle': '맞춤형 IC와 프로그래머블 로직',
                'prod-memory-title': '메모리 및 스토리지',
                'prod-memory-subtitle': 'DRAM, Flash, eMMC 및 UFS',
                'prod-poweric-title': '전원 IC',
                'prod-poweric-subtitle': '전력 관리 솔루션',
                'prod-sensor-title': '센서',
                'prod-sensor-subtitle': '종합 센싱 솔루션',
                'prod-automotive-title': '차량용 IC',
                'prod-automotive-subtitle': 'AEC-Q 등급 부품',
                'prod-adcdac-title': 'ADC/DAC 변환기',
                'prod-adcdac-subtitle': '신호 체인 및 AFE',
                'prod-interface-title': '인터페이스 IC',
                'prod-interface-subtitle': '연결 및 인터페이스',
                'prod-rf-title': 'RF, 마이크로파 및 mmWave',
                'prod-rf-subtitle': '고주파 솔루션',
                'prod-discrete-title': '전력 디스크리트',
                'prod-discrete-subtitle': 'MOSFET, IGBT, SiC 및 GaN',
                'prod-connector-title': '커넥터',
                'prod-connector-subtitle': '커넥터 및 인터커넥트',
                'prod-devtools-title': '개발 도구',
                'prod-devtools-subtitle': '도구 및 생태계',
                'brand-main-title': '제품 브랜드',
                'brand-global-name': '글로벌 브랜드',
                'brand-global-desc': '신뢰 가능한 채널로 유명 반도체 브랜드를 소싱합니다.',
                'brand-domestic-name': '중국 주요 브랜드',
                'brand-domestic-desc': '중국 반도체 공급망과 비용 효율적인 대안을 지원합니다.',
                'quality-title': '엄격한 품질 관리 시스템',
                'quality-subtitle': '3단계 심층 검사로 정품 부품 납품을 지원합니다',
                'bom-title-line2': '빠른 BOM 서비스',
                'bom-subtitle': 'BOM을 보내주시면 2시간 내 조달 엔지니어가 솔루션을 제공합니다.',
                'network-card-title': '글로벌 소싱 · 빠른 납품',
                'services-hero-title': '공급망 인텔리전스',
                'services-hero-subtitle': '품질 보증 ◘ 고객 우선',
                'services-qc-main-title': '품질 및 보증',
                'services-qc-subtitle': '공급 리스크를 줄이는 종합 검사와 엄격한 관리 체계',
                'services-qc-title-1': '무결점 품질',
                'services-qc-title-2': '전 과정 실험실 시스템',
                'services-qc-desc': '공급업체와 자재를 검증하고 물리, 전기 테스트로 공급망 리스크를 낮춥니다.',
                'qc-step1-h': '외관 일관성 검사',
                'qc-step1-p': '마킹, 패키지, 원라벨을 현미경으로 확인합니다.',
                'qc-step2-h': 'X-Ray 구조 검사',
                'qc-step2-p': '다이, 리드프레임, 치수 일치 여부를 확인합니다.',
                'qc-step3-h': 'Decap 분석',
                'qc-step3-p': '내부 다이 마킹을 원본 데이터와 비교합니다.',
                'qc-step4-h': '전기 및 스트레스 테스트',
                'qc-step4-p': '다양한 온도 조건에서 파라미터를 검증합니다.',
                'qc-track-check': '검사 범위',
                'qc-track-origin': '원산지 추적',
                'qc-track-standard': '입고 검증',
                'qc-track-service': '품질 시스템',
                'services-gsc-primary-title': '글로벌 공급 채널',
                'services-gsc-secondary-title': '부족 칩 현물 대응 솔루션',
                'services-gsc-desc': 'OEM 잉여, 원공급 채널, 재고 자원을 통합해 부족 품목을 빠르게 매칭합니다.',
                'services-section-services': '핵심 서비스',
                'services-section-services-desc': '전자부품 공급망 원스톱 서비스',
                'services-section-process': '서비스 프로세스',
                'services-section-process-desc': '안정적 품질을 위한 표준 절차',
                'services-section-advantages': '서비스 강점',
                'services-section-advantages-desc': 'LimChip을 선택하는 이유',
                'apps-hero-title': '산업 솔루션',
                'apps-hero-subtitle': '산업 전문성 ➽ 가치 창출',
                'apps-section-title': '적용 분야',
                'apps-section-subtitle1': '핵심 반도체 분야에 집중',
                'apps-section-subtitle2': '고부가가치 적용 시나리오 지원',
                'app-card1-title': '자동차 전장',
                'app-card2-title': 'AI 및 컴퓨팅',
                'app-card3-title': '전력 및 에너지',
                'app-card4-title': '산업 전자',
                'app-card5-title': '통신',
                'app-card6-title': '의료 전자',
                'app-card7-title': '특수 분야',
                'app-card8-title': '소비자 전자',
                'sol-section-title': '솔루션',
                'sol-section-subtitle1': '전 과정 기술 폐루프',
                'sol-section-subtitle2': '디지털 전환 지원',
                'client-main-title': '주요 고객',
                'insight-title': '산업 전문 인사이트',
                'partners-title': '주요 고객사',
                'about-hero-title': '회사 소개',
                'about-hero-subtitle': '칩 유통사 ▚ 가치 제공',
                'about-overview-title': '❍전자부품 유통사',
                'about-mission-label': '미션',
                'about-mission-slogan': '글로벌 연결 · 혁신 지원 · 공급 안정',
                'about-values-title': '핵심 가치',
                'about-values-subtitle': '핵심 가치 · 지속 성장의 기반',
                'about-history-title': '성장 과정',
                'about-history-subtitle': '발전 경로 · 집중과 축적',
                'about-cta-title': '함께 혁신하기',
                'about-cta-btn': '문의하기',
                'contact-hero-subtitle': '전문 팀이 언제든 상담과 지원을 제공합니다'
            },
            es: {
                'products-hero-title': 'Productos',
                'products-hero-subtitle': 'Distribución híbrida ⧈ Canales diversos ⧈ Amplio portafolio',
                'products-section-categories': 'Categorías de productos',
                'products-section-subtitle1': 'Cobertura completa de componentes electrónicos',
                'products-section-subtitle2': 'Soporte integral para su cadena de suministro',
                'prod-including': 'Incluye:',
                'prod-mcu-title': 'Microcontroladores y procesadores',
                'prod-mcu-subtitle': 'MCU, MPU y procesadores',
                'prod-asicfpga-title': 'ASIC y FPGA',
                'prod-asicfpga-subtitle': 'IC personalizados y lógica programable',
                'prod-memory-title': 'Memoria y almacenamiento',
                'prod-memory-subtitle': 'DRAM, Flash, eMMC y UFS',
                'prod-poweric-title': 'IC de potencia',
                'prod-poweric-subtitle': 'Gestión avanzada de energía',
                'prod-sensor-title': 'Sensores',
                'prod-sensor-subtitle': 'Soluciones completas de sensado',
                'prod-automotive-title': 'IC automotrices',
                'prod-automotive-subtitle': 'Componentes con grado AEC-Q',
                'prod-adcdac-title': 'Convertidores ADC/DAC',
                'prod-adcdac-subtitle': 'Cadena de señal y AFE',
                'prod-interface-title': 'IC de interfaz',
                'prod-interface-subtitle': 'Conectividad e interfaces',
                'prod-rf-title': 'RF, microondas y mmWave',
                'prod-rf-subtitle': 'Soluciones de alta frecuencia',
                'prod-discrete-title': 'Discretos de potencia',
                'prod-discrete-subtitle': 'MOSFET, IGBT, SiC y GaN',
                'prod-connector-title': 'Conectores',
                'prod-connector-subtitle': 'Conectores e interconexión',
                'prod-devtools-title': 'Herramientas de desarrollo',
                'prod-devtools-subtitle': 'Herramientas y ecosistema',
                'brand-main-title': 'Marcas de productos',
                'brand-global-name': 'Marcas internacionales',
                'brand-global-desc': 'Sourcing de marcas líderes de semiconductores mediante canales confiables.',
                'brand-domestic-name': 'Marcas chinas líderes',
                'brand-domestic-desc': 'Apoyo a la cadena china de chips y alternativas rentables.',
                'quality-title': 'SISTEMA ESTRICTO DE CONTROL DE CALIDAD',
                'quality-subtitle': 'Inspección de tres niveles para entregar componentes originales',
                'bom-title-line2': 'Servicio BOM rápido',
                'bom-subtitle': 'Envíe su BOM y un ingeniero de compras preparará una solución en 2 horas.',
                'network-card-title': 'Sourcing global · Entrega rápida',
                'services-hero-title': 'INTELIGENCIA DE CADENA DE SUMINISTRO',
                'services-hero-subtitle': 'Garantía de calidad ◘ Clientes primero',
                'services-qc-main-title': 'CALIDAD Y GARANTÍA',
                'services-qc-subtitle': 'Procesos de inspección y gestión rigurosa para reducir riesgos de suministro',
                'services-qc-title-1': 'CALIDAD CERO DEFECTOS',
                'services-qc-title-2': 'Sistema de laboratorio completo',
                'services-qc-desc': 'Verificamos proveedores y materiales para reducir riesgos mediante pruebas físicas y eléctricas.',
                'qc-step1-h': 'Inspección visual',
                'qc-step1-p': 'Verificación de marcado, encapsulado y etiquetas originales.',
                'qc-step2-h': 'Detección X-Ray',
                'qc-step2-p': 'Revisión de die, lead frame y dimensiones.',
                'qc-step3-h': 'Análisis Decap',
                'qc-step3-p': 'Comparación de marcados internos con datos originales.',
                'qc-step4-h': 'Pruebas eléctricas y estrés',
                'qc-step4-p': 'Validación de parámetros bajo distintas temperaturas.',
                'qc-track-check': 'Cobertura de inspección',
                'qc-track-origin': 'Trazabilidad',
                'qc-track-standard': 'Verificación de entrada',
                'qc-track-service': 'Sistema de calidad',
                'services-gsc-primary-title': 'CANALES GLOBALES DE SUMINISTRO',
                'services-gsc-secondary-title': 'Soluciones spot para chips escasos',
                'services-gsc-desc': 'Integramos excedentes OEM, canales originales e inventario para ubicar partes escasas con rapidez.',
                'services-section-services': 'Servicios clave',
                'services-section-services-desc': 'Servicio integral de suministro de componentes electrónicos',
                'services-section-process': 'Proceso de servicio',
                'services-section-process-desc': 'Proceso estándar para calidad estable',
                'services-section-advantages': 'Ventajas del servicio',
                'services-section-advantages-desc': 'Por qué elegirnos',
                'apps-hero-title': 'Aplicaciones industriales',
                'apps-hero-subtitle': 'Experiencia sectorial ➽ Creación de valor',
                'apps-section-title': 'Áreas de aplicación',
                'apps-section-subtitle1': 'Enfoque en sectores clave de semiconductores',
                'apps-section-subtitle2': 'Soporte preciso para escenarios de alto valor',
                'app-card1-title': 'Electrónica automotriz',
                'app-card2-title': 'AI y computación',
                'app-card3-title': 'Energía y potencia',
                'app-card4-title': 'Electrónica industrial',
                'app-card5-title': 'Comunicaciones',
                'app-card6-title': 'Electrónica médica',
                'app-card7-title': 'Campos especiales',
                'app-card8-title': 'Electrónica de consumo',
                'sol-section-title': 'Soluciones',
                'sol-section-subtitle1': 'Arquitectura técnica de ciclo completo',
                'sol-section-subtitle2': 'Impulsando la transformación digital',
                'client-main-title': 'A QUIÉN SERVIMOS',
                'insight-title': 'Perspectivas de experiencia sectorial',
                'partners-title': 'CLIENTES CLAVE',
                'about-hero-title': 'Sobre nosotros',
                'about-hero-subtitle': 'Distribuidor de chips ▚ Entregando valor',
                'about-overview-title': '❍Distribuidor de componentes electrónicos',
                'about-mission-label': 'Nuestra misión',
                'about-mission-slogan': 'CONECTIVIDAD GLOBAL · INNOVACIÓN · SEGURIDAD DE SUMINISTRO',
                'about-values-title': 'Valores clave',
                'about-values-subtitle': 'Valores · Base del crecimiento sostenible',
                'about-history-title': 'Historia',
                'about-history-subtitle': 'Trayectoria · Enfoque y desarrollo',
                'about-cta-title': 'INNOVEMOS JUNTOS',
                'about-cta-btn': 'Contactar',
                'contact-hero-subtitle': 'Un equipo profesional siempre listo para ayudar'
            },
            vi: {
                'products-hero-title': 'Sản phẩm',
                'products-hero-subtitle': 'Phân phối linh hoạt ⧈ Kênh đa dạng ⧈ Danh mục rộng',
                'products-section-categories': 'Danh mục sản phẩm',
                'products-section-subtitle1': 'Bao phủ đầy đủ linh kiện điện tử',
                'products-section-subtitle2': 'Hỗ trợ một điểm cho chuỗi cung ứng',
                'prod-including': 'Bao gồm:',
                'prod-mcu-title': 'Vi điều khiển và bộ xử lý',
                'prod-mcu-subtitle': 'MCU, MPU và bộ xử lý',
                'prod-asicfpga-title': 'ASIC và FPGA',
                'prod-asicfpga-subtitle': 'IC tùy chỉnh và logic lập trình',
                'prod-memory-title': 'Bộ nhớ và lưu trữ',
                'prod-memory-subtitle': 'DRAM, Flash, eMMC và UFS',
                'prod-poweric-title': 'IC nguồn',
                'prod-poweric-subtitle': 'Quản lý nguồn nâng cao',
                'prod-sensor-title': 'Cảm biến',
                'prod-sensor-subtitle': 'Giải pháp cảm biến toàn diện',
                'prod-automotive-title': 'IC ô tô',
                'prod-automotive-subtitle': 'Linh kiện đạt chuẩn AEC-Q',
                'prod-adcdac-title': 'Bộ chuyển đổi ADC/DAC',
                'prod-adcdac-subtitle': 'Chuỗi tín hiệu và AFE',
                'prod-interface-title': 'IC giao tiếp',
                'prod-interface-subtitle': 'Kết nối và giao tiếp',
                'prod-rf-title': 'RF, vi ba và mmWave',
                'prod-rf-subtitle': 'Giải pháp tần số cao',
                'prod-discrete-title': 'Linh kiện công suất rời',
                'prod-discrete-subtitle': 'MOSFET, IGBT, SiC và GaN',
                'prod-connector-title': 'Đầu nối',
                'prod-connector-subtitle': 'Đầu nối và liên kết',
                'prod-devtools-title': 'Công cụ phát triển',
                'prod-devtools-subtitle': 'Công cụ và hệ sinh thái',
                'brand-main-title': 'Thương hiệu sản phẩm',
                'brand-global-name': 'Thương hiệu quốc tế',
                'brand-global-desc': 'Tìm nguồn từ các thương hiệu bán dẫn uy tín qua kênh đáng tin cậy.',
                'brand-domestic-name': 'Thương hiệu Trung Quốc hàng đầu',
                'brand-domestic-desc': 'Hỗ trợ chuỗi cung ứng chip Trung Quốc và lựa chọn tối ưu chi phí.',
                'quality-title': 'HỆ THỐNG KIỂM SOÁT CHẤT LƯỢNG NGHIÊM NGẶT',
                'quality-subtitle': 'Quy trình kiểm tra ba cấp hỗ trợ giao linh kiện chính hãng',
                'bom-title-line2': 'Dịch vụ BOM nhanh',
                'bom-subtitle': 'Gửi BOM, kỹ sư mua hàng sẽ phản hồi giải pháp trong 2 giờ.',
                'network-card-title': 'Nguồn hàng toàn cầu · Giao nhanh',
                'services-hero-title': 'TRÍ TUỆ CHUỖI CUNG ỨNG',
                'services-hero-subtitle': 'Đảm bảo chất lượng ◘ Khách hàng là trước hết',
                'services-qc-main-title': 'CHẤT LƯỢNG VÀ ĐẢM BẢO',
                'services-qc-subtitle': 'Quy trình kiểm tra và quản lý nghiêm ngặt giúp giảm rủi ro nguồn cung',
                'services-qc-title-1': 'CHẤT LƯỢNG KHÔNG LỖI',
                'services-qc-title-2': 'Hệ thống phòng lab toàn quy trình',
                'services-qc-desc': 'Chúng tôi xác minh nhà cung cấp và vật liệu, giảm rủi ro bằng kiểm tra vật lý và điện tính.',
                'qc-step1-h': 'Kiểm tra ngoại quan',
                'qc-step1-p': 'Xác minh marking, package và nhãn gốc bằng kính hiển vi.',
                'qc-step2-h': 'Kiểm tra cấu trúc X-Ray',
                'qc-step2-p': 'Đối chiếu die, lead frame và kích thước.',
                'qc-step3-h': 'Phân tích Decap',
                'qc-step3-p': 'So sánh marking bên trong với dữ liệu gốc.',
                'qc-step4-h': 'Kiểm tra điện và stress',
                'qc-step4-p': 'Xác minh thông số ở nhiều điều kiện nhiệt độ.',
                'qc-track-check': 'Phạm vi kiểm tra',
                'qc-track-origin': 'Truy xuất nguồn',
                'qc-track-standard': 'Kiểm tra đầu vào',
                'qc-track-service': 'Hệ thống chất lượng',
                'services-gsc-primary-title': 'KÊNH CUNG ỨNG TOÀN CẦU',
                'services-gsc-secondary-title': 'Giải pháp hàng sẵn cho chip khan hiếm',
                'services-gsc-desc': 'Kết hợp dư hàng OEM, kênh chính hãng và tồn kho để khớp nhanh linh kiện khan hiếm.',
                'services-section-services': 'Dịch vụ cốt lõi',
                'services-section-services-desc': 'Dịch vụ chuỗi cung ứng linh kiện điện tử một điểm',
                'services-section-process': 'Quy trình dịch vụ',
                'services-section-process-desc': 'Quy trình chuẩn để đảm bảo chất lượng',
                'services-section-advantages': 'Lợi thế dịch vụ',
                'services-section-advantages-desc': 'Vì sao chọn chúng tôi',
                'apps-hero-title': 'Ứng dụng ngành',
                'apps-hero-subtitle': 'Chuyên sâu ngành ➽ Tạo giá trị',
                'apps-section-title': 'Lĩnh vực ứng dụng',
                'apps-section-subtitle1': 'Tập trung các lĩnh vực bán dẫn trọng điểm',
                'apps-section-subtitle2': 'Hỗ trợ chính xác các kịch bản giá trị cao',
                'app-card1-title': 'Điện tử ô tô',
                'app-card2-title': 'AI và tính toán',
                'app-card3-title': 'Nguồn và năng lượng',
                'app-card4-title': 'Điện tử công nghiệp',
                'app-card5-title': 'Truyền thông',
                'app-card6-title': 'Điện tử y tế',
                'app-card7-title': 'Lĩnh vực đặc biệt',
                'app-card8-title': 'Điện tử tiêu dùng',
                'sol-section-title': 'Giải pháp',
                'sol-section-subtitle1': 'Kiến trúc kỹ thuật toàn quy trình',
                'sol-section-subtitle2': 'Thúc đẩy chuyển đổi số',
                'client-main-title': 'KHÁCH HÀNG CỦA CHÚNG TÔI',
                'insight-title': 'Góc nhìn chuyên môn ngành',
                'partners-title': 'KHÁCH HÀNG TIÊU BIỂU',
                'about-hero-title': 'Giới thiệu',
                'about-hero-subtitle': 'Nhà phân phối chip ▚ Tạo giá trị',
                'about-overview-title': '❍Nhà phân phối linh kiện điện tử',
                'about-mission-label': 'Sứ mệnh',
                'about-mission-slogan': 'KẾT NỐI TOÀN CẦU · ĐỔI MỚI · AN TOÀN NGUỒN CUNG',
                'about-values-title': 'Giá trị cốt lõi',
                'about-values-subtitle': 'Giá trị · Nền tảng tăng trưởng bền vững',
                'about-history-title': 'Lịch sử phát triển',
                'about-history-subtitle': 'Hành trình · Tập trung và tích lũy',
                'about-cta-title': 'CÙNG ĐỔI MỚI',
                'about-cta-btn': 'Liên hệ',
                'contact-hero-subtitle': 'Đội ngũ chuyên nghiệp luôn sẵn sàng hỗ trợ'
            }
        };

        Object.keys(pagePacks).forEach(lang => {
            packs[lang] = { ...packs[lang], ...pagePacks[lang] };
        });

        Object.keys(packs).forEach(lang => {
            this.translations[lang] = { ...en, ...packs[lang] };
        });
    }

    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();

        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-[9999] px-6 py-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full text-white`;
        
        const bgColor = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' }[type] || 'bg-blue-600';
        notification.classList.add(bgColor);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.remove('translate-x-full'), 100);
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getCurrentLang() { return this.currentLang; }
}

// 实例化
window.languageManager = new LanguageManager();
