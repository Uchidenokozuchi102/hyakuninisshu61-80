"use client"

import { useState, useEffect } from "react"
import { BookOpen, Brain, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const poems = [
  { no: 61, kami: "いにしへの 奈良の都の 八重桜", shimo: "けふ九重に にほひぬるかな", author: "伊勢大輔", translation: "昔の奈良の都の八重桜が、今日は宮中で美しく咲き誇っていることですよ。", kimari: "いに" },
  { no: 62, kami: "夜をこめて 鳥のそらねは はかるとも", shimo: "よに逢坂の 関はゆるさじ", author: "清少納言", translation: "夜明け前に鶏の鳴き真似をして騙そうとしても、この逢坂の関だけは決して通しませんよ。", kimari: "よを" },
  { no: 63, kami: "今はただ 思ひ絶えなむ とばかりを", shimo: "人づてならで 言ふよしもがな", author: "左京大夫道雅", translation: "今はもう、あなたのことをあきらめてしまおう。そのことだけを、人づてではなく直接会って言う方法があればいいのになあ。", kimari: "いまは" },
  { no: 64, kami: "朝ぼらけ 宇治の川霧 たえだえに", shimo: "あらはれわたる 瀬々の網代木", author: "権中納言定頼", translation: "夜が明けるころ、宇治川の川霧が切れ切れになって、川瀬に立てられた網代木が次第に現れてくる景色のおもしろさよ。", kimari: "あさぼ" },
  { no: 65, kami: "恨みわび ほさぬ袖だに あるものを", shimo: "恋に朽ちなむ 名こそ惜しけれ", author: "相模", translation: "あなたのつれない仕打ちを恨み、涙で乾く間もない袖さえ口惜しいのに、そのうえ悪い噂が立って、私の恋の名が廃れてしまうのが残念です。", kimari: "うらみ" },
  { no: 66, kami: "もろともに あはれと思へ 山桜", shimo: "花よりほかに 知る人もなし", author: "前大僧正行尊", translation: "私がお前を懐かしく思うように、お前も私を懐かしく思ってくれ、山桜よ。この山奥では、桜の花のほかに私の心を知ってくれる人はいないのだから。", kimari: "もろ" },
  { no: 67, kami: "春の夜の 夢ばかりなる 手枕に", shimo: "かひなく立たむ 名こそ惜しけれ", author: "周防内侍", translation: "春の夜の夢のようにはかない、あなたの手枕のせいで、つまらない噂が立ってしまうのが残念です。", kimari: "はるの" },
  { no: 68, kami: "心にも あらでうき世に ながらへば", shimo: "恋しかるべき 夜半の月かな", author: "三条院", translation: "本意ではなく、このつらい世の中に生き長らえていたなら、今夜のこの月をきっと恋しく思い出すことだろう。", kimari: "こころ" },
  { no: 69, kami: "あらし吹く 三室の山の もみぢ葉は", shimo: "龍田の川の 錦なりけり", author: "能因法師", translation: "山風が吹く三室山の紅葉が散って、龍田川の水面は錦を織ったように美しいなあ。", kimari: "あらし" },
  { no: 70, kami: "さびしさに 宿を立ち出でて ながむれば", shimo: "いづくも同じ 秋の夕暮れ", author: "良暹法師", translation: "あまりの寂しさに家を出てあたりを眺めてみたが、どこも同じように寂しい秋の夕暮れであることよ。", kimari: "さび" },
  { no: 71, kami: "夕されば 門田の稲葉 おとづれて", shimo: "芦のまろやに 秋風ぞ吹く", author: "大納言経信", translation: "夕方になると、門前の田んぼの稲葉を揺らして、芦葺きの粗末な小屋に秋風が吹き渡ってくる。", kimari: "ゆふ" },
  { no: 72, kami: "音にきく たかしの浜の あだ波は", shimo: "かけじや袖の ぬれもこそすれ", author: "祐子内親王家紀伊", translation: "評判の高い高師の浜のいたずらに立つ波のように、浮気だというあなたの言葉には心をかけますまい。後で涙で袖を濡らすことになってはいけませんから。", kimari: "おとに" },
  { no: 73, kami: "高砂の 尾の上の桜 咲きにけり", shimo: "外山の霞 立たずもあらなむ", author: "権中納言匡房", translation: "遠くの高い山の峰の桜が咲いたことだ。人里に近い山の霞よ、どうか立たないでいておくれ。（桜が見えなくなってしまうから）", kimari: "たか" },
  { no: 74, kami: "憂かりける 人を初瀬の 山おろしよ", shimo: "はげしかれとは 祈らぬものを", author: "源俊頼朝臣", translation: "私につれなくするあの人が私を思うようになるようにと、初瀬の観音様に祈ったけれど、初瀬の山おろしのように、あの人のつれない態度が激しくなるようにとは祈らなかったのになあ。", kimari: "うかり" },
  { no: 75, kami: "契りおきし させもが露を 命にて", shimo: "あはれ今年の 秋もいぬめり", author: "藤原基俊", translation: "約束してくださった「させも草の恵みの露（私を昇進させてくれるという言葉）」を命の綱として頼みにしていましたが、ああ、今年の秋もむなしく過ぎていくようです。", kimari: "ちぎり" },
  { no: 76, kami: "わたの原 漕ぎ出でて見れば ひさかたの", shimo: "雲居にまがふ 沖つ白波", author: "法性寺入道前関白太政大臣", translation: "大海原に船を漕ぎ出して眺めると、遥か彼方の雲と見分けがつかないほど、沖の白波が立っていることだよ。", kimari: "わたの" },
  { no: 77, kami: "瀬をはやみ 岩にせかるる 滝川の", shimo: "われても末に 逢はむとぞ思ふ", author: "崇徳院", translation: "川の流れが速く、岩にせき止められた急流が二つに分かれてもまた一つになるように、私たちも今は別れても、将来は必ず再会しようと思う。", kimari: "せを" },
  { no: 78, kami: "淡路島 かよふ千鳥の 鳴く声に", shimo: "いく夜ねざめぬ 須磨の関守", author: "源兼昌", translation: "淡路島から通ってくる千鳥の寂しい鳴き声に、幾晩目を覚まさせられたことだろうか、須磨の関守は。", kimari: "あはぢ" },
  { no: 79, kami: "秋風に たなびく雲の 絶え間より", shimo: "もれ出づる月の 影のさやけさ", author: "左京大夫顕輔", translation: "秋風に吹かれてたなびいている雲の切れ間から、漏れ出てくる月の光の、なんと澄みきって美しいことか。", kimari: "あきか" },
  { no: 80, kami: "長からむ 心もしらず 黒髪の", shimo: "乱れて今朝は ものをこそ思へ", author: "待賢門院堀河", translation: "あなたの心が変わらず長く続くかどうかは分かりません。（別れたばかりの）今朝は、私の黒髪が乱れているように心も乱れて、物思いに沈んでおります。", kimari: "なが" },
]

type Mode = "menu" | "study" | "quiz"

export default function HyakuninIsshuApp() {
  const [mode, setMode] = useState<Mode>("menu")
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null)
  const [currentPoem, setCurrentPoem] = useState<(typeof poems)[0] | null>(null)
  const [options, setOptions] = useState<typeof poems>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (mode === "quiz" && !currentPoem) {
      generateNewQuestion()
    }
  }, [mode])

  const generateNewQuestion = () => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)]
    setCurrentPoem(randomPoem)

    const wrongPoems = poems.filter((p) => p.no !== randomPoem.no)
    const selectedWrong = wrongPoems.sort(() => Math.random() - 0.5).slice(0, 3)
    const allOptions = [randomPoem, ...selectedWrong].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (selectedPoem: (typeof poems)[0]) => {
    if (!currentPoem) return
    setSelectedAnswer(selectedPoem.no)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  if (mode === "menu") {
    return (
      <div className="h-[100dvh] bg-black flex flex-col items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 relative z-10"
        >
          <div className="space-y-2">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-red-500 tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              百人一首
            </h1>
            <p className="font-serif text-yellow-500 text-xl tracking-[0.5em] font-light uppercase">HYAKUNIN ISSHU</p>
            <p className="text-gray-500 text-sm mt-2">No.61 〜 80</p>
          </div>

          <div className="flex flex-col gap-4 mt-12 w-full max-w-xs mx-auto">
            <button
              onClick={() => setMode("study")}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-serif text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-105 rounded-lg flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              学習モード
            </button>
            <button
              onClick={() => setMode("quiz")}
              className="w-full h-16 bg-yellow-500 hover:bg-yellow-600 text-black font-serif text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105 rounded-lg flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              クイズモード
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (mode === "study") {
    return (
      <div className="h-[100dvh] bg-black flex flex-col overflow-hidden relative">
        <div className="bg-gradient-to-b from-gray-900 to-black border-b border-red-500/30 p-4 shadow-[0_0_20px_rgba(239,68,68,0.3)] z-10">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-red-500 tracking-wider">学習モード</h1>
            <button
              onClick={() => setMode("menu")}
              className="text-gray-400 hover:text-white text-sm"
            >
              メニューへ
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-safe">
          {poems.map((poem) => (
            <div
              key={poem.no}
              className={`bg-gray-900/50 border border-gray-800 p-4 rounded-xl cursor-pointer transition-all hover:border-red-500/50 ${
                selectedPoem === poem.no ? "bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : ""
              }`}
              onClick={() => setSelectedPoem(selectedPoem === poem.no ? null : poem.no)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500 font-bold">No.{poem.no}</span>
                      <span className="text-xs text-gray-500 font-serif">{poem.author}</span>
                    </div>
                    <p className="font-serif text-white text-lg leading-relaxed">{poem.kami}</p>
                    <p className="font-serif text-gray-400 text-sm leading-relaxed">{poem.shimo}</p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-red-500 transition-transform ${
                      selectedPoem === poem.no ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {selectedPoem === poem.no && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pt-4 border-t border-red-900/30 space-y-3 overflow-hidden"
                    >
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <span className="text-yellow-500 text-xs font-bold block mb-1">現代語訳</span>
                        <p className="text-gray-300 text-sm leading-relaxed">{poem.translation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 text-xs font-bold">決まり字:</span>
                        <span className="text-white font-serif">{poem.kimari}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
          <div className="h-20" /> {/* Bottom spacer */}
        </div>
      </div>
    )
  }

  if (mode === "quiz" && currentPoem) {
    const isCorrect = selectedAnswer === currentPoem.no
    const kamiLines = currentPoem.kami.split(" ")

    return (
      <div className="flex flex-col h-[100dvh] bg-black overflow-hidden relative selection:bg-red-900 selection:text-white">
        {/* 背景グリッド */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* 戻るボタン (左上固定) */}
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => setMode("menu")}
            className="p-2 bg-gray-900/80 hover:bg-gray-800 border border-red-500/50 rounded-lg text-red-500 hover:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* 1. 上の句エリア (高さ45% = 少し上げる) */}
        <div className="h-[45dvh] flex-none flex flex-col justify-end items-center pb-6 z-10 relative select-none">
          <motion.div
            key={currentPoem.no}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3 px-4"
          >
            {kamiLines.map((line, index) => (
              <div 
                key={index} 
                className="font-serif text-3xl md:text-5xl text-red-500 font-bold leading-relaxed tracking-wider drop-shadow-[0_2px_10px_rgba(220,38,38,0.6)]"
              >
                {line}
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2. 操作エリア */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-8 relative z-10">
          <AnimatePresence mode="wait">
            {!showResult ? (
              // 選択肢ボタン (今まで通り下寄せ)
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full space-y-3 max-w-md mx-auto"
              >
                {options.map((option, index) => (
                  <motion.div
                    key={option.no}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleAnswerSelect(option)}
                      className="w-full h-auto py-3 px-4 bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-indigo-900/30 rounded-xl font-serif text-lg text-left flex justify-start active:bg-red-900/40 active:border-red-500 transition-all"
                    >
                      {option.shimo}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // 結果表示 (ここを変更：上下に分割配置)
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full max-w-md mx-auto flex flex-col justify-between"
              >
                {/* 上側：結果カード (mt-2 で少し隙間を空け、上の句のすぐ下に) */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md mt-2 ${isCorrect ? "bg-red-950/80 border-red-500" : "bg-blue-950/80 border-blue-500"}`}
                >
                  <div className="text-center mb-2">
                    <span className={`text-xl font-bold tracking-widest ${isCorrect ? "text-red-400" : "text-blue-400"}`}>
                      {isCorrect ? "正解！" : "不正解..."}
                    </span>
                  </div>

                  <div className="text-center mb-2">
                    <p className="text-xl md:text-2xl font-serif text-white font-bold leading-relaxed tracking-tight">{currentPoem.shimo}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                    <span>作者: {currentPoem.author}</span>
                    <span className="font-bold">No.{currentPoem.no}</span>
                  </div>
                </motion.div>

                {/* 下側：次へボタン (一番下に固定) */}
                <button
                  onClick={handleNextQuestion}
                  className="w-full h-14 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] text-lg tracking-wider flex items-center justify-center gap-2 active:scale-95"
                >
                  <RotateCcw className="w-5 h-5" /> 次へ
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return null
}