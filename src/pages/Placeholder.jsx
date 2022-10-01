import Logo from "../components/Logo";
import "./Placeholder.css"

export default function Placeholder() {
    return (
        <div className="App">
            <header className="App-header">
                <Logo/>
                <p>
                    Placeholder page
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    )
}