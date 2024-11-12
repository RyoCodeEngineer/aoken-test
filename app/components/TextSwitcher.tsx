import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

// `children` プロパティを含む型定義
interface TextSwitcherProps {
  children: ReactNode; // 任意のReact要素を受け取るために `ReactNode` を使用
}

const TextSwitcher: React.FC<TextSwitcherProps> = ({ children }) => {
  const [currentText, setCurrentText] = useState<React.ReactNode>(children); // 現在表示するテキスト
  const [isExiting, setIsExiting] = useState(false); // フェードアウト中かどうかを管理
  const [isMounted, setIsMounted] = useState(true); // 初期表示のためのフラグ

  // // 5秒ごとにテキストを切り替える処理
  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   setIsTextChanging(true);
  //   //   setTimeout(() => {
  //   //     setIsTextChanging(false);
  //   //   }, 500); // フェードアウト後に次のテキストに切り替える
  //   // }, 5000); // 5秒ごとにテキストを切り替える

  //   const interval = setInterval(() => {
  //     setIsExiting(true); // フェードアウトを開始
  //   }, 5000); // 5秒ごとにテキストを切り替え

  //   return () => clearInterval(interval);
  // }, []);

  // `children` が変わったときにテキストを切り替える処理
  useEffect(() => {
    // `children` が変わるたびにテキストをフェードアウトして切り替える
    if (children !== currentText) {
      setIsExiting(true); // フェードアウト開始
    }
  }, [children, currentText]); // `children` が変わったときに実行

  // フェードアウト完了後に次のテキストに切り替える
  const handleAnimationComplete = () => {
    if (isExiting) {
      setIsMounted(false); // アニメーション終了後に次のテキストを準備
      setTimeout(() => {
        setCurrentText(children); // `children` を新しいテキストとして設定
        setIsMounted(true); // 新しいテキストを表示
        setIsExiting(false); // フェードアウト完了後に状態をリセット
      }, 500); // フェードアウト後少し待ってからテキストを切り替える
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isMounted && (
          <motion.div
            key={currentText as string} // `currentText` が変更されるたびにアニメーションが発生
            initial={{ opacity: 0 }} // 初期状態は不透明
            animate={{ opacity: isExiting ? 0 : 1 }} // isExitingがtrueの場合にフェードアウト
            exit={{ opacity: 0 }} // exit時にフェードアウト
            transition={{
              opacity: { duration: 0.5 },
              delay: isExiting ? 0 : 0.2, // フェードインのタイミングを調整
            }} // アニメーション時間を調整
            onAnimationComplete={handleAnimationComplete} // アニメーションが完了したらテキストを切り替え
          >
            {currentText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextSwitcher;
