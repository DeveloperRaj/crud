import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="not-found">
			<h2>
		        We can not find that page
		    </h2>
	        <Link to="/">Home</Link>
	    </div>
    );
}

export default NotFound;