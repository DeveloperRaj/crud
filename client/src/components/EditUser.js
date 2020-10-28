import { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './styles/form.css';

const EditUser = (props) => {

	const [formData, setFormData] = useState({});
	const [isEdited, setIsEdited] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data } = await axios.get(`/users/${props.match.params.id}`);
				setFormData(data.user[0]);
			} catch(err) {
				console.log(err);
			}
		}
		getUser();
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (formData.name === "" || formData.email === "" || formData.phone === "" || formData.gender === "") {
			alert('Please fill in all details');
		} else {
			try {
				const { data } = await axios.post(`/users/edit/${props.match.params.id}`, formData);
				if (data.msg === 'success') {
					setIsEdited(true);
				}
			} catch(err) {
				alert('Something went wrong');
			}
		}
	}
	
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	if (isEdited) {
		return <Redirect to="/" />
	} else {
		return(
			<div className="form-container">
				<h3>Enter details</h3>
				<form onSubmit={submitHandler}>
					<input 
						type="text" 
						placeholder="Enter your name" 
						onChange={onChange} 
						name="name" 
						value={formData.name}
					/>
					<input 
						type="email" 
						placeholder="Enter your email" 
						onChange={onChange}
						name="email"
						value={formData.email}
					/>
					<input 
						type="number" 
						placeholder="Enter your phone no." 
						onChange={onChange}
						name="phone"
						value={formData.phone}
					/>
					<div>
						<label htmlFor="gender">Male</label>
						<input 
							type="radio" 
							name="gender" 
							value="male" 
							placeholder="Enter your name" 
							onChange={onChange}
							selected={formData.gender === "male"}
						/>
						<label htmlFor="gender">Female</label>
						<input 
							type="radio" 
							name="gender" 
							value="female" 
							placeholder="Enter your name" 
							onChange={onChange}
							selected={formData.gender === "female"}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default EditUser;