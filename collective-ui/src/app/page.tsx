"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

type Tab = "home" | "protocol";

export default function Home() {
  const [tab, setTab] = useState<Tab>("home");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="relative min-h-screen selection:bg-brand/30 selection:text-white">
      {/* 3D BACKGROUND SCENE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* FOREGROUND UI */}
      <div className="relative z-10">
        {/* NAV */}
        <nav className="fixed top-0 inset-x-0 h-16 flex items-center justify-between px-8 md:px-12 z-50 bg-black/40 backdrop-blur-xl border-b border-border-dim">
          <button onClick={() => setTab("home")} className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/90 cursor-pointer bg-transparent border-none">
            <span className="text-brand text-lg">◈</span>
            THE COLLECTIVE
          </button>
          <div className="hidden md:flex gap-8 font-mono text-[11px] tracking-widest text-white/50">
            <button onClick={() => { setTab("home"); setTimeout(() => document.getElementById("crisis")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit tracking-inherit">CRISIS</button>
            <button onClick={() => { setTab("home"); setTimeout(() => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit tracking-inherit">VISION</button>
            <button onClick={() => { setTab("home"); setTimeout(() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit tracking-inherit">CHALLENGES</button>
            <button onClick={() => setTab("protocol")} className={`hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit tracking-inherit ${tab === "protocol" ? "text-brand" : ""}`}>PROTOCOL</button>
          </div>
          <a href="https://github.com/BrantonLiu/ai-governed-collective" target="_blank" rel="noreferrer" className="font-mono text-[11px] tracking-widest border border-brand/40 text-brand px-5 py-2 hover:bg-brand hover:text-black transition-all">
            JOIN PROTOCOL
          </a>
        </nav>

        {/* ============================================= */}
        {/* TAB: HOME */}
        {/* ============================================= */}
        {tab === "home" && (
          <>
            {/* HERO */}
            <section className="relative h-[100svh] flex flex-col items-center justify-center pt-16">
              <div className="absolute top-20 inset-x-8 md:inset-x-12 flex flex-wrap items-center gap-0 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <span className="px-4">PROTOCOL_01</span>
                <div className="animus-divider" />
                <span className="px-4">STATUS: <span className="text-[#39d68f]">ACTIVE</span></span>
                <div className="animus-divider hidden sm:block" />
                <span className="px-4 hidden sm:block">AI_SUPERVISOR: <span className="text-[#39d68f]">ONLINE</span></span>
              </div>

              <motion.div style={{ y, opacity }} className="text-center px-6 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="font-mono text-[10px] tracking-[0.25em] text-white/40 mb-8 uppercase">
                  AI-Governed Collective / Branton Liu / Feb 2026
                </motion.div>

                <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }} className="font-cinzel text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-none text-white mb-8 text-glow">
                  DAY<span className="text-brand">BREAK</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                  AI 正在接管每一份工作。我们在问：那些被替代的人，该怎么活？
                </motion.p>
              </motion.div>

              <div className="absolute bottom-6 inset-x-8 md:inset-x-12 flex justify-between items-center font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase border-t border-border-dim pt-4">
                <span className="hidden md:block text-brand/80">月亮是仲裁者的象征 · 天亮了，将是实验成功的标志</span>
                <span>COUNCIL: 7+1 GENESIS</span>
              </div>
            </section>

            <div className="h-[20vh]" />

            {/* SECTION 1: CRISIS */}
            <section id="crisis" className="relative py-32 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="mb-20">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-brand mb-6 uppercase">01 / The Crisis</div>
                  <h2 className="font-cinzel text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
                    你的<span className="text-brand italic">工资</span>，正在<br />
                    一年一年<span className="text-[#ff5050]">越买越少</span>。
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-start">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="text-white/60 text-lg leading-relaxed space-y-6">
                    <p>你隔壁的程序员，去年用 AI 工具一个人顶了五人团队。他的老板裁了四个人，给他涨了一丁点工资，自己赚走了剩下的四份。</p>
                    <div className="p-6 bg-black/50 border border-brand/20 border-l-2 border-l-brand font-mono text-sm flex flex-wrap items-center gap-3 backdrop-blur-md text-white/80">
                      <span>买AI工具</span> <span className="text-white/30">→</span>
                      <span>省掉人力</span> <span className="text-white/30">→</span>
                      <span>利润翻倍</span> <span className="text-white/30">→</span>
                      <span className="text-[#ff5050] font-bold">再买更好的AI</span>
                    </div>
                    <p>这个循环每转一圈，手里没有资本的人能分到的那一份，就薄一点。没有人在故意害你，但结果就是这样。</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }} className="glass-panel p-10 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand to-transparent" />
                    <blockquote className="font-cinzel text-2xl/10 md:text-3xl/10 font-light italic text-white/90">
                      &ldquo;你做了多少，就应该得多少。<span className="text-brand not-italic">不管你爸是谁。</span>&rdquo;
                    </blockquote>
                  </motion.div>
                </div>

                {/* Protocol Trust Quote */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-20 border-l-2 border-brand/30 pl-6 max-w-3xl">
                  <p className="font-mono text-[10px] tracking-widest text-brand/60 mb-2 uppercase">— Protocol I · The Crisis</p>
                  <p className="text-white/40 text-sm italic leading-relaxed">&ldquo;已持有资本的人将获得超级AI能力，产出远超普通劳动所能达到的水平。在按资分配的制度下，这些盈余全部回流至顶端——形成一种指数级分化，任何现有的再分配机制都无法匹配其速度。&rdquo;</p>
                </motion.div>
              </div>
            </section>

            {/* SECTION 2: VISION (BENTO) */}
            <section id="vision" className="relative py-32 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-brand mb-6 uppercase">02 / The Vision</div>
                  <h2 className="font-cinzel text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
                    干了多少，<br />
                    <span className="text-brand italic">算数</span>。
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-7 glass-panel p-8 border-t-2 border-t-brand hover:border-brand/50 transition-colors group">
                    <div className="text-4xl mb-6 text-brand drop-shadow-[0_0_15px_rgba(77,217,255,0.8)]">⚖</div>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-wide">AI 当裁判，不当老板</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      AI不决定规则，它只管按规则算分。它不认识你，不欠任何人人情，也不怕得罪谁。就像赛场上的计时器——<strong className="text-white">谁跑得快，数字就说谁快</strong>。
                    </p>
                    <div className="mt-6 font-mono text-[10px] tracking-widest text-brand border border-brand/30 inline-block px-3 py-1 bg-brand/5">AI ARBITER / NOT RULER</div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-5 md:row-span-2 glass-panel p-8 hover:bg-white/[0.05] transition-colors">
                    <div className="text-3xl mb-6 text-white/80">⏳</div>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-wide">你干了多少，就记多少</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      系统记录你花了多少力气完成一件事，按现在大家的平均水平换算成积分。没有期权，没有暗箱，账本所有人都能查。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-border-dim px-2 py-1 font-mono text-[9px] text-white/50 tracking-widest">NO EQUITY</span>
                      <span className="border border-border-dim px-2 py-1 font-mono text-[9px] text-white/50 tracking-widest">AUDITABLE</span>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-4 glass-panel p-8 hover:bg-white/[0.05] transition-colors">
                    <h3 className="text-base font-medium text-white mb-3">钱买得到入场券，买不到话语权</h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      有钱人可以早一步加入，但随着越来越多普通人进来出力，最初那份钱能控制的比例，会一点一点缩小。
                    </p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-3 glass-panel p-8 text-center flex flex-col justify-center border-b-2 border-b-brand/50">
                    <div className="font-cinzel text-6xl text-brand leading-none mb-4">100<span className="text-2xl text-brand/60">%</span></div>
                    <h3 className="text-sm font-medium text-white">无条件保底</h3>
                  </motion.div>
                </div>

                {/* Protocol Trust Quote */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 border-l-2 border-brand/30 pl-6 max-w-3xl">
                  <p className="font-mono text-[10px] tracking-widest text-brand/60 mb-2 uppercase">— Protocol III · Core Principles</p>
                  <p className="text-white/40 text-sm italic leading-relaxed">&ldquo;正如摄像头记录客观证据，AI提供中性的衡量，而人的判断则会引入偏见、偏袒和私利。摄像头没有儿子。&rdquo;</p>
                </motion.div>
              </div>
            </section>

            {/* SECTION 3: CHALLENGES */}
            <section id="challenges" className="relative py-32 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-brand mb-6 uppercase">03 / Open Challenges</div>
                  <h2 className="font-cinzel text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
                    稍微看看<span className="text-brand italic">不远的将来</span>。
                  </h2>
                  <p className="mt-8 text-xl text-white/50 font-light max-w-3xl leading-relaxed">
                    这样的组织充满了太多挑战。我们不装看不见，我们把问题摊在桌面上——因为大家的问题，就应该靠大家一起来解决，而不是靠几个创始人在后台拍板。
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { id: "A", title: "AI 被谁控制？", desc: "当\"中立裁判\"悄悄变成维护者的影子时，谁来看住看门人？历史上每一个\"中立\"机构，最后都被最接近它的人捕获了。", color: "#ff5050" },
                    { id: "B", title: "刷分怎么办？", desc: "当积分变成目标，它就不再衡量我们真正在乎的东西了。苏联工厂为完成产量指标造劣质品——我们能逃得过这个诅咒吗？", color: "#fbbf24" },
                    { id: "C", title: "政府不让你搞怎么办？", desc: "没有哪个跨国经济组织能永远在主权管控之外运行。真正的攻击不会正面来——它会以金融监管、反洗钱、未申报税务的形式出现。", color: "#a78bfa" },
                    { id: "D", title: "人类劳动不值钱了怎么办？", desc: "整个协议建立在\"人的贡献有价值\"这个前提上。当具身AI让人类劳动本身变得不稀缺时，这个前提就失效了。", color: "#4dd9ff" },
                    { id: "E", title: "创始人翻车了怎么办？", desc: "每一个建立在个人道德信誉上的组织，都会遇到那个人暴露人性弱点的时刻。组织对那个时刻的回应，决定了一切。", color: "#f472b6" },
                  ].map((crisis, i) => (
                    <motion.div
                      key={crisis.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-panel p-8 group hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-mono text-xs tracking-widest" style={{ color: crisis.color }}>CRISIS {crisis.id}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-3">{crisis.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6">{crisis.desc}</p>
                      <a
                        href={`https://github.com/BrantonLiu/ai-governed-collective/issues`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] tracking-widest text-brand/70 hover:text-brand transition-colors"
                      >
                        → 参与讨论
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Trust framing */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center max-w-3xl mx-auto">
                  <p className="text-white/40 text-base leading-relaxed">
                    我们不发布答案。我们发布<span className="text-brand">问题</span>——因为真正的解决方案应该从集体推理中涌现，而不是由创始人拍板。
                  </p>
                  <a href="https://github.com/BrantonLiu/ai-governed-collective/issues" target="_blank" rel="noreferrer" className="inline-block mt-8 font-mono text-sm tracking-widest bg-brand/10 border border-brand/30 text-brand px-8 py-4 hover:bg-brand hover:text-black transition-all">
                    去 GitHub Issues 贡献你的智慧 ↗
                  </a>
                </motion.div>
              </div>
            </section>

            {/* SECTION 4: THE BET */}
            <section id="bet" className="relative py-40 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-cinzel text-5xl md:text-6xl text-white font-light tracking-tight mb-12">
                  一场老实人的赌约
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
                  <p>我们相信：一个用 AI 算分、账本公开、干多少得多少的系统，能让里面的人过得比现在<strong className="text-white">更有底气、更有尊严。</strong></p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1 }} className="my-20 flex flex-col items-center gap-10">
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-brand to-transparent" />
                  <blockquote className="font-cinzel text-3xl md:text-4xl italic font-light text-brand drop-shadow-[0_0_10px_rgba(77,217,255,0.4)]">
                    &ldquo;能干多少，就出多少力。<br />
                    出了多少力，就拿多少。&rdquo;
                  </blockquote>
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-brand to-transparent" />
                </motion.div>

                {/* Protocol Trust Quote */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border-l-2 border-brand/30 pl-6 text-left max-w-2xl mx-auto mb-16">
                  <p className="font-mono text-[10px] tracking-widest text-brand/60 mb-2 uppercase">— Protocol VII · The Bet</p>
                  <p className="text-white/40 text-sm italic leading-relaxed">&ldquo;如果我们错了，实验失败，我们学到教训。如果我们对了，我们就为AI时代的后资本主义组织建立了一个可复制的模型。&rdquo;</p>
                </motion.div>

                <a href="https://github.com/BrantonLiu/ai-governed-collective" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 font-mono text-sm tracking-widest bg-brand text-black px-10 py-5 hover:bg-white transition-colors cursor-pointer">
                  JOIN THE EXPERIMENT ↗
                </a>
              </div>
            </section>
          </>
        )}

        {/* ============================================= */}
        {/* TAB: PROTOCOL (Full Text) */}
        {/* ============================================= */}
        {tab === "protocol" && (
          <section className="pt-24 pb-32 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="font-mono text-[10px] tracking-[0.2em] text-brand mb-6 uppercase">The Collective Protocol · Full Text</div>
                <h2 className="font-cinzel text-4xl md:text-5xl font-light text-white mb-4">协议全文</h2>
                <p className="text-white/40 text-sm mb-12">Protocol 01 — Drafted by Branton Liu, February 2026</p>
              </motion.div>

              <article className="prose prose-invert prose-sm max-w-none
                prose-headings:font-cinzel prose-headings:font-light prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:text-brand prose-h2:border-b prose-h2:border-border-dim prose-h2:pb-4 prose-h2:mt-16
                prose-h3:text-xl prose-h3:text-white/90
                prose-p:text-white/60 prose-p:leading-relaxed
                prose-blockquote:border-brand/40 prose-blockquote:text-white/50 prose-blockquote:italic
                prose-strong:text-white
                prose-li:text-white/60
                prose-code:text-brand prose-code:bg-brand/10 prose-code:px-1 prose-code:rounded
              ">
                <h2>I. 危机：资本 × AI = 不可逆的集中</h2>
                <p>当AI生产力扩展时，以下反馈循环将自我强化：资本→更强的模型→更高的生产力→更多的资本。已持有资本的人将获得超级AI能力，产出远超普通劳动所能达到的水平。在按资分配的制度下，这些盈余全部回流至顶端——形成一种指数级分化，任何现有的再分配机制（税收、监管、反垄断）都无法匹配其速度。</p>
                <p><strong>未来不能由谁拥有资本来决定，必须由谁创造价值来决定。</strong></p>

                <h2>II. 愿景：基于贡献的分配</h2>
                <p>我们提议一个实验性组织：AI代理担任贡献仲裁者和回报分配者；贡献和劳动——而非资本所有权——决定每个成员的份额；保障基线收入确保没有人跌破体面生活的底线；工作成为选择，而非生存必需。</p>

                <h2>III. 核心原则</h2>

                <h3>1. AI是仲裁者，不是统治者</h3>
                <p>AI衡量每份贡献的社会劳动价值。它不制定规则——它以人类机构无法比拟的一致性和透明度执行规则。正如摄像头记录客观证据，AI提供中性的衡量，而人的判断则会引入偏见、偏袒和私利。</p>

                <h3>2. 社会必要劳动时间</h3>
                <p>分配基于&ldquo;社会必要劳动时间&rdquo;——在平均生产力条件下生产特定产出所需的劳动。超出基线的剩余贡献转化为：集体内的决策权、福利选择权、以及一种不可继承的新型社会资产。</p>

                <h3>3. 完全透明</h3>
                <p>所有贡献、物料、交付和分配计算都有清晰归属记录。系统可被任何成员随时审计。不透明是信任的敌人。</p>

                <h3>4. 按项目分配（无股权）</h3>
                <p>没有公司股权。分配按项目进行，基于衡量的贡献。这防止了传统资本主义的积累逻辑在集体内部再现。</p>

                <h3>5. 集体风险共担</h3>
                <p>所有项目将一部分收益注入共享资金池，用于覆盖：其他项目的亏损、AI系统运营和迭代、全体成员的福利开支。</p>

                <h3>6. 无条件保底</h3>
                <p>每个成员的基本需求无条件地得到满足。这不是施舍——这是使真正自愿贡献成为可能的基石。</p>

                <h3>7. 资本的地位：双轨制与劳动稀释</h3>
                <p>资本不同于劳动。资本是可回收的资产，而人类的时间和精力是不可逆的牺牲。为了在不重塑资本主义的前提下为集体融资，我们通过四个机制处理资金注入：</p>
                <ul>
                  <li><strong>八二双轨制</strong>：约80%的早期资金被视为优先债，拥有收益保障但不产生贡献积分。约20%作为对早期归零风险的承担，转化为固定的贡献积分。</li>
                  <li><strong>劳动不断稀释资本</strong>：早期资本获得固定积分。随着后续劳动者注入，资本积分的相对比重被永久稀释。</li>
                  <li><strong>生命周期衰减</strong>：资本兑换积分的&ldquo;汇率&rdquo;随系统总资产增长而衰减。雪中送炭享有高加权，锦上添花几乎无治理权。</li>
                  <li><strong>个人禀赋相对论</strong>：财务贡献的价值相对于出资者的个人净资产评估。衡量的是真实牺牲比例，不是绝对金额。</li>
                </ul>

                <h2>IV. 哲学基础</h2>
                <p>我们不提议用独裁取代民主。我们提议用技术中介的客观性取代以人为中心的决策——在这个系统中，一切透明、可审计、并持续自我修正。</p>
                <p>制度合法性是后验的，不是先验的。一个系统通过交付结果来赢得存在的权利，而不是通过被正式批准。本协议遵循同样的逻辑：构建它、测试它、迭代它，让采纳成为最终的投票。</p>

                <h2>VII. 赌约</h2>
                <p>我们正在打一个赌：一个透明的、AI仲裁的、基于贡献的分配系统，能够为其成员提供比传统资本主义更好的物质结果——并且这种优越性将足够显而易见，无需制度命令就能推动采纳。</p>
                <p>如果我们错了，实验失败，我们学到教训。如果我们对了，我们就为AI时代的后资本主义组织建立了一个可复制的模型。</p>

                <div className="mt-16 pt-8 border-t border-border-dim text-center">
                  <p className="font-cinzel text-xl italic text-brand">&ldquo;From each according to their ability, to each according to their contribution.&rdquo;</p>
                  <p className="font-mono text-[10px] tracking-widest text-white/30 mt-4">— The AI-Governed Collective</p>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="py-12 px-8 border-t border-border-dim bg-black/60 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] tracking-widest text-white/30">
            <div>◈ THE COLLECTIVE PROTOCOL</div>
            <div className="text-right">PROTOCOL 01 — DRAFTED BY BRANTON LIU<br/>OBJECTIVE CODE. HUMAN DIGNITY.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
