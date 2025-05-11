export default function Emoji({type}){
    switch(type){
        case 'hobby':
            return <span>☘️</span>;
        case `personal`:
            return <span>🐼</span>;
        case `work`:
            return <span>💼</span>;
        case `urgent`:
            return <span>🚨</span>;
        case `high`:
            return <span>🔴</span>;
        case `medium`:
            return <span>🟡</span>;
        case `low`:
            return <span>🟢</span>;
        default:
            return <span>📝</span>;
    }
}