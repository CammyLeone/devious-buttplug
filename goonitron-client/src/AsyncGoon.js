import React from "react";
import RotatingImages from "./RotatingImages";

const selectRandom = (array) => array[Math.floor(Math.random() * array.length)];
const selectRandomSlice = (size) => (array) => {
  const slice = [];
  while (slice.length < size && slice.length < array.length) {
    const toSelect = selectRandom(array);
    if (!slice.includes(toSelect)) {
      slice.push(toSelect);
    }
  }
  return slice;
};

class AsyncGoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preLoaded: [],
      unLoaded: Object.keys(props.files),
    };
  }

  async componentDidMount() {
    const { unLoaded, preLoaded } = this.state;
    const pathsToLoad = selectRandomSlice(100)(unLoaded);
    const promises = pathsToLoad.map(
      (path) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = this.props.files[path].preview;
          img.onload = () => {
            console.log(`preloaded ${path}`);
            resolve();
          };
          img.onerror = (e) => reject(e);
        })
    );
    try {
      await Promise.all(promises);
    } catch (e) {
      debugger;
    }
    this.setState({
      preLoaded: [...preLoaded, ...pathsToLoad],
      unLoaded: unLoaded.filter((path) => !pathsToLoad.includes(path)),
    });
  }

  render() {
    const urls = this.state.preLoaded.map((f) => this.props.files[f].preview);
    if (urls.length === 0) return null;

    return (
      <RotatingImages
        urls={urls}
        onAllDisplayed={() => {
          debugger;
        }}
      />
    );
  }
}

export default AsyncGoon;
