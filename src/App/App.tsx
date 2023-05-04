import React, { Component } from "react";
import Header from "./components/ui/Header/Header";
import Navbar from "./components/ui/Navbar/Navbar";
import WFirstGrow from "./components/layout/WFirstGrow/WFirstGrow";
import MemeForm from "./components/MemeForm/MemeForm";
import Footer from "./components/ui/Footer/Footer";
import { MemeSVGViewer, emptyMeme, MemeInterface, ImageInterface } from "orsys-tjs-meme";

interface iAppState {
  meme: MemeInterface;
  images:Array<ImageInterface>;
}
interface IAppProps {}

export default class App extends React.Component<IAppProps, iAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { meme: emptyMeme, images:[] };
  }
  componentDidMount(): void {
    fetch('http://localhost:5679/images',{
      headers:{
        Origin: 'https://localhost:5679'
      }
    })
      .then(r=>r.json())
      .then(arr=>this.setState({images:arr}));
  }

  render() {
    return (
      <div className="App" data-testid="App">
        <Header />
        <Navbar />
        {JSON.stringify(this.state)}
        <WFirstGrow>
          <MemeSVGViewer meme={this.state.meme} image={undefined} />
          <MemeForm
            meme={this.state.meme}
            onMemeChange={(meme: MemeInterface) => {
              this.setState({ meme: meme });
            }}
          />
        </WFirstGrow>
        <Footer />
      </div>
    );
  }
}
