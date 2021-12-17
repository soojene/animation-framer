import styled from "styled-components";
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 400px;
  gap: 10px;
  margin-bottom: 50px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .6);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 50px;
  width: 50px;
  box-shadow: 0 0px 5px 3px rgba(0, 0, 0, 0.2);
`;

const SwitchBtn = styled.button<{switchball:boolean}>`
  font-size: 1rem;
  padding: 5px 10px;
  color: ${(props)=>props.switchball? "orange" : "blue"};
  transform:${(props)=>props.switchball? "scale(1.13)" : "scale(1)"};
  background-color: white;
  transition: .3s transform ease-in-out;
  cursor: pointer;
  border: none;
  border-radius:5px ;
`;

const boxVariants = {
  hovering:{
    backgroundColor:"white",
    scale: 1.13,
    transition: { duration: .3 },
  },
  before:{
    width: 200,
    height: 200
  },
  after:{
    width: 180,
    height: 180,
    backgroundColor:"white",
  }
};

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  padding-top: 300px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [big, setBig] = useState<boolean>(false);
  const [switchball, setSwitchball] = useState<boolean>(false);
  const toggleSwitchball = () => setSwitchball((prev) => !prev);
  
  const [clickBox, setClickBox] = useState<string>("first");
  const toggleClickBox = (id:string) => {
    setClickBox(id);
  }
  const toggle = ()=> setBig((pre)=>!pre);
  return (
    <Wrapper>
        <Grid>
            <Box
              variants={boxVariants}
              whileHover="hovering"
              layoutId='first'
              onClick={()=>{
                toggleClickBox("first");
                setBig(true);
              }}
            />
            <Box>
              {!switchball ? (
                <Circle layoutId="circle" style={{ borderRadius: 50 }} />
              ) : null}
            </Box>
            <Box>
              {switchball? (
                <Circle layoutId="circle" style={{ borderRadius: 50 }} />
              ) : null}
            </Box>
            <Box
              variants={boxVariants}
              whileHover="hovering"
              layoutId='second'
              onClick={()=>{
                toggleClickBox("second");
                setBig(true);
            }}
            />
        </Grid>

      <SwitchBtn onClick={toggleSwitchball} switchball={switchball}>Switch</SwitchBtn>

      <AnimatePresence>
        {big ? (
        <Overlay variants={overlay} 
        initial="hidden"
        animate="visible"
        exit="exit" 
        onClick={toggle}>
          <Box layoutId={clickBox} variants={boxVariants} initial="before" animate="after" />
        </Overlay>
        ) : null}
      </AnimatePresence>

    </Wrapper>
  );
}

export default App;