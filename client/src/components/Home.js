import Card from './Card';
import './styles/home.css';

const Home = ({ users }) => {

	return(
		<div className="profile-display">
			{
				users.map((val) => <Card val={val} key={val._id} />)
			}
		</div>
	);
	
}

export default Home;