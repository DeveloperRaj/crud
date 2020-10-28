import { Link } from 'react-router-dom';
import axios from 'axios';
import John from './john.jpg';

const Card = ({ val }) => {

	const deleteHandler = async () => {
		const sure = window.confirm('Are you sure?');
		if (sure) {
			try {
				const { data } = await axios.delete(`/users/delete/${val._id}`);
			} catch(err) {
				console.log(err);
			}
		}
	}

	return(
		<div className="card">
			<img src={ John } alt="profile" />
			<h4>{ val.name }</h4>
			<p>{ val.email }</p>
			<p>{ val.gender }</p>
			<p>{ val.phone }</p>
			<div className="space-around">
				<Link to={`/edit/${val._id}`}>Edit</Link>
				<button onClick={deleteHandler}>Delete</button>
			</div>
		</div>
	);
}

export default Card;