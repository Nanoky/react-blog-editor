import './App.css';
import { EditorBase, ServiceProvider } from 'react-blog-editor';

function App() {
    return (
        <div className='App'>
            <div>
                <ServiceProvider unsplashKey={'Pr75Jod0wsrksOqFVKoSJzL9HjzShsOM5Lj_5eri2NA'}>
                    <EditorBase />
                </ServiceProvider>
            </div>
        </div>
    );
}

export default App;
