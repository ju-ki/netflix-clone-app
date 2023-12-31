import './App.css';
import { Banner } from './Banner';
import { Row } from './Row';
import { requests } from './request';

function App() {
  return (
    <div className="App">
      <Banner/>
      <Row
        title="NETFLIX ORIGINAL"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Animation Movies"
        fetchUrl={requests.fetchAnimationMovies}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title="Document Movies"
        fetchUrl={requests.fetchDocumentMovies}
      />
    </div>
  );
}

export default App;
