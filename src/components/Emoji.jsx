export default function Emoji({type='personal'}){
    switch(type){
        case 'hobby':
            return <span>☘️</span>;
        case `personal`:
            return <span>🐼</span>;
        case `work`:
            return <span>💼</span>;
        case `urgent`:
            return <span>🚨</span>;
        default:
            return <span>📝</span>;
    }
}