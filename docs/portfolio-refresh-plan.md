# 项目详情页改造提案（Proposal only）

本文仅记录五个详情页的具体设计方案，供后续审阅。当前首页清理不实施这些详情页改动，也不修改其项目事实或交互功能。

目标是让项目各自的实际工作决定内容顺序，减少重复的 Problem / Contribution / Approach / Delivery 模板、抽象口号及非功能性边框。每个模块保持完整可读，内容较少时自然收短，不为凑满一屏制造留白。公开页面继续使用英文。

## 1. 体育评测系统

路径：`/projects/sports-education`

| 顺序 | 建议英文标题 | 内容安排 |
| --- | --- | --- |
| 1 | A live PE assessment system | 合并真实使用场景、个人职责与 jQuery → React 迁移背景，让读者先知道产品服务谁、本人做了什么。 |
| 2 | Follow one assessment | 保留互动 demo，展示一次评测如何产生个人结果。紧邻标注 `Interactive reconstruction · Sample data`，不把重建演示当成原产品截图或真实摄像头识别。 |
| 3 | Video, scores and feedback | 集中讲 Canvas、WebSocket、多人成绩、音画同步和已有多摄像头内容。实际贡献与解释性排查示例保持明确区分。 |

删除独立、重复的通用 Problem / Delivery 介绍；把已确认的学校使用场景放回开头。保留可操作演示，不新增未经证实的性能数字、识别准确率或算法贡献。

## 2. 融合付

路径：`/projects/ronghe-pay`

| 顺序 | 建议英文标题 | 内容安排 |
| --- | --- | --- |
| 1 | An evolving payments platform | 用收款、付款、对账的业务流程说明产品，交代 PHP 产品的 Vue 2 前端重建，以及之后持续接入新保险公司和银行的工作。 |
| 2 | Different banks, different fields | 单独展开机构配置和银行返回字段差异，说明有些由后端转换，有些由前端适配。 |
| 3 | Rendering larger datasets | 集中描述已确认的大数据量渲染优化，避免被迁移背景掩盖。 |
| 4 | Real-time payment safeguards | 写清实时支付要求及本人处理重复提交的前端职责，并联系支付后的对账流程。 |

名称含义只在项目信息旁解释一次；删除 `Care in every payment` 等抽象口号。保留收款、赔付、对账的业务关键词，不补写未经确认的虚拟列表、幂等键、加密机制、合规认证或端到端安全保证。若使用字段映射示意，必须标明其为说明性示例。

## 3. 低代码平台

路径：`/projects/low-code-platform`

| 顺序 | 建议英文标题 | 内容安排 |
| --- | --- | --- |
| 1 | Simple apps for internal teams | 写明低代码兴起的背景，以及内部营销、施工部门搭建简单应用的用途。用短时间线交代 Vue 3 → Vue 2 接入公司微前端系统。 |
| 2 | Build your own app | 直接保留组件搭建、层级调整、预览和换肤 demo。 |
| 3 | Components, data and hierarchy | 用三个短主题解释复合组件数据流、拖拽父子关系、主题切换，突出本人实际参与的部分。 |

删除重复复述 demo 功能的长段落。演示继续标为新的作品集重建；十个组件、两层分组等限制属于演示选择，不代表原系统实现。不新增微前端框架名称或迁移策略。

## 4. 公共卫生学院课程系统

路径：`/projects/medical-curriculum`

| 顺序 | 建议英文标题 | 内容安排 |
| --- | --- | --- |
| 1 | Around six weeks to launch | 交代通过合作公司独立参与、一个前端配一个后端、约六周完成旧教育系统改版上线。学校身份沿用已核实的 `School of Public Health, Peking University` 及相关医学部背景。 |
| 2 | Shared courses, connected knowledge | 用明确标为示意的关系图，解释专业、共享课程、公共课、知识点与基础选课功能。 |
| 3 | Clicks, dragging and repeated use | 合并左键、右键、双击、拖拽的交互冲突，以及反复操作稳定性、定制标签、高 UI 还原要求与渲染性能。 |

删去重复的教育行业介绍，将原先过细的技术主题合并成有联系的叙述。保留 React / Three.js 与本人前端职责，不把示意图包装成原系统截图；不推测手势各自对应的操作、事件绑定方案或帧率。

## 5. Love Story Theater

路径：`/projects/love-story-theater`

| 顺序 | 建议英文标题 | 内容安排 |
| --- | --- | --- |
| 1 | Made for a friend after a breakup | 直接讲为失恋朋友制作的起因，并醒目标注 `Offline · No longer maintained`。 |
| 2 | Frontend and backend, separately | 展示 Next.js 前端 → Kotlin / Ktor JSON API → DeepSeek 的分离结构，区分浏览器状态与后端模型调用。 |
| 3 | From conversation to story | 说明分阶段提问、上下文追问、最终故事生成，以及英语、中文、德语内容组织。 |

只保留源码链接，不添加小镇入口或在线体验按钮。减少“温暖空间”等泛化包装，用具体起因体现个人色彩。不为补齐页面而虚构产品截图、用户规模、疗愈效果或服务仍可用的暗示。

## 共同的素材与验证原则

- 原产品截图、作品集重建 demo、架构或流程示意图使用不同说明，不能互相冒充。
- 保留真实照片与已确认的项目事实；没有素材的项目可以采用简短文字与标注清楚的示意图。
- 商业项目强调真实职责、约束和具体问题；个人项目可以更直接地表达制作起因及当前状态。
- 后续若实施这些方案，仍需执行仓库的布局、交互及构建检查，并检查桌面和手机上的实际画面。本文没有记录任何新实施或新测试结果。
