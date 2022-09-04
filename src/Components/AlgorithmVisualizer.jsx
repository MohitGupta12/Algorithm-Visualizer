import React from "react";
import {mergeSort} from '../SortingAlgo/mergeSort.js'
import './AlgorithmVisualizer.css';

// From https://www.youtube.com/watch?v=pFXYym4Wbkc&list=TLPQMDIwODIwMjLnhusj3Tni8Q&index=4

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'teal';
const SECONDARY_COLOR = 'red';
const Sorted_COLOR = 'purple';

export default class AlgorithmVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: [],
            sortedSlide: [],
        };
    }
    
    componentDidMount() {
        this.resetSlide();
    }

    resetSlide() {
        const slide = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            slide.push(randomNo(5, 730));
        }
        const sortedSlide = slide.slice().sort((a, b) => a - b);
        this.setState({ slide });
        this.setState({sortedSlide});
    }


    mergeSort() {
        console.log(this.state.slide);
        console.log(this.state.sortedSlide);
        const currentSlide = this.state.slide;
        const sortedSlide = this.state.sortedSlide;
        const animations = mergeSort(this.state.slide);
        for (let i = 0; i < animations.length; i++) {
            const slideBars = document.getElementsByClassName('bars');
            const isColorChange = i % 3 !== 2;
            const [barIdx1, barIdx2] = animations[i];
            const barOneStyle = slideBars[barIdx1].style;
            if (isColorChange) {
                const barTwoStyle = slideBars[barIdx2].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    // if (currentSlide[barIdx1] === sortedSlide[barIdx1]) {
                    //     barOneStyle.backgroundColor = Sorted_COLOR;
                    // }
                }, i * ANIMATION_SPEED_MS);
              
            } else {
                setTimeout(() => {
                    const [barIdx1, newHeight] = animations[i];
                    const barOneStyle = slideBars[barIdx1].style;
                    barOneStyle.height = `${newHeight}px`
                    // if (currentSlide[barIdx1] === sortedSlide[barIdx1]) {
                    //     barOneStyle.backgroundColor = Sorted_COLOR;
                    // }
                }, i * ANIMATION_SPEED_MS);
                
            }
        }

    }
    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomNo(1, 1000);
                for (let i = 0; i < length; i++) {
                    array.push(randomNo(-1000, 1000));
                }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = mergeSort(array.slice());
            console.log(AreEqual(javaScriptSortedArray, mergeSortedArray));
        }
      }
    
    render() {
        const { slide } = this.state;

        return (
            <div className="array-container">
                {slide.map((value, idx) => (
                    <div
                        className="bars"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}>
                    </div>
                ))}
                <button onClick={()=>this.resetSlide()}>Generate New 
                    Array</button>
                <button onClick={() => this.mergeSort()} > Merge Sort </button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>
                    Test Sorting Algorithms (BROKEN)
                </button>
            </div>
        );
    }
    
}

function randomNo(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function AreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

