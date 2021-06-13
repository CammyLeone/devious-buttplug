import React from "react";

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

  componentDidMount() {
    this.preloadSomeMore();
  }

  async preloadSomeMore() {
    const { unLoaded, preLoaded } = this.state;
    if (!unLoaded.length) {
      console.log("Got em all!");
      return;
    }

    if (this.state.isPreloading) {
      console.log("Already preloading!");
      return;
    }
    this.setState({ isPreloading: true });

    const pathsToLoad = selectRandomSlice(this.props.batchSize)(unLoaded);
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
      isPreloading: false,
    });
  }

  render() {
    const Component = this.props.component;
    const urls = this.state.preLoaded.map((f) => this.props.files[f].preview);
    if (urls.length === 0) return null;

    return (
      <Component
        urls={urls}
        preloadMore={() => {
          this.preloadSomeMore();
        }}
      />
    );
  }
}

export default AsyncGoon;
