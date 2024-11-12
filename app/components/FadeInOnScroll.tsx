import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

// `children` プロパティを含む型定義
interface FadeInOnScrollProps {
  children: ReactNode; // 任意のReact要素を受け取るために `ReactNode` を使用
}

const FadeInOnScroll = ({ children }: FadeInOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true); // 要素が画面内に入ったら表示
        }
      },
      { threshold: 0.1 } // 要素の10%が画面内に入ったらトリガー
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }} // 初期状態は非表示
      animate={{ opacity: isVisible ? 1 : 0 }} // 画面内に入ったらフェードイン
      transition={{ duration: 1 }} // フェードインの時間
    >
      {children} {/* children の中身が表示される */}
    </motion.div>
  );
};

export default FadeInOnScroll;
