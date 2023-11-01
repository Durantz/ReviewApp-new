"use client"

import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';

interface AnimatedCheckbox{
    checked: boolean;
    onCheckedChange: () => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckbox> = ({checked, onCheckedChange}) => {

    const onChange = () =>{
        onCheckedChange()
    }

    return (
        <AnimatePresence initial={false} mode="wait">
          {checked ? (
            <motion.div
              className="w-14 h-14 bg-primary rounded-full flex justify-center"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
              key="smile"
              onClick ={onChange}
            >
                <Image className="object-contain" src={"/happyGab.png"} alt="smile" width={40} height={40}/>
            </motion.div>
          ) : (
            <motion.div
              className="w-14 h-14 bg-zinc-200 rounded-full flex justify-center"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{ duration: 0.5 }}
              key="sad"              
              onClick ={onChange}
            >
                <Image className="object-contain" src={"/almostSadGab.png"} alt="sad" width={45} height={45}/>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default AnimatedCheckbox;