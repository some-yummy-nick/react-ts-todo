import {useHistory} from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <h1>About</h1>
            <button className="btn" onClick={() => history.push('/')}>Обратно к списку дел</button>
        </>
    )
};
