import {useState, useEffect} from 'react';
import './App.css'

function FollowMouse() {
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        // follow mouse logic
        const handleMove = (event) => {
            const {clientX, clientY} = event;
            console.log('handleMOve => ', {clientX, clientY})
            setPosition({x: clientX, y: clientY});
        };
        if (enabled) {
            // addEventListener('mousemove', handleMove);
            addEventListener('pointermove', handleMove);
        }

        return () => {
            removeEventListener('pointermove', handleMove);
            setPosition({x: 0, y: 0});
        }
    }, [enabled]);

    const handleClick = () => {
        setEnabled(!enabled);
    }

    return (
        <>
            <div style={
                {
                    position: 'absolute',
                    backgroundColor: '#09f',
                    borderRadius: '50%',
                    opacity: 0.8,
                    pointerEvents: 'none',
                    left: -20,
                    top: -20,
                    width: 40,
                    height: 40,
                    transform: `translate(${position.x}px, ${position.y}px)`
                }
            }/>
            <button onClick={handleClick}>{enabled ? 'Disable' : 'Enable'} pointer tracking</button>
        </>
    );
}

function App() {
    return (
        <main>
            <FollowMouse/>
        </main>
    )
}

export default App
