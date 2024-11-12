import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ImageSwitcher: React.FC = () => {
  const images = [
    "billy-freeman-pX66y31DOIQ-unsplash.jpg", // 画像のパス
    "josh-olalde-X1P1_EDNnok-unsplash.jpg",
    "shane-mclendon-EN1tF2EG-50-unsplash.jpg",
  ];

  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [isImageChanging, setIsImageChanging] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsImageChanging(true);
      setTimeout(() => {
        setCurrentImage((prevImage) => {
          const currentIndex = images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
        setIsImageChanging(false);
      }, 500); // フェードアウト後に次の画像に切り替える
    }, 5000); // 5秒ごとに画像を切り替え

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full"
        >
          <img
            src={currentImage}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageSwitcher;
