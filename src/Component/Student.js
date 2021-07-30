import React, { useState } from 'react';
import "./Student.css";

function Student() {

	const [input, setInput] = useState({
		name: '',
		age: '',
		gender: '',
		status: 0
	})

	const [record, setRecord] = useState([]);

	const handleChange = (e) => {
		let name = e.target.name;
		let val = e.target.value;

		if (name == "gender" && e.target.checked) {
			val = e.target.id;
		}
		setInput({ ...input, [name]: val })
	}

	const handleSubmit = () => {
		const exp = /^[A-Za-z\s]+$/; 
		const name = input.name; 
		if (name.match(exp)){ 
			// return true; 
			const newRecord = { ...input, status: 1, id: new Date().getTime().toString() };
			setRecord([...record, newRecord]);
		}
		else {
			alert("Please Enter Valid Name");
		}	
		//empty after submit box 
		input.name = ''
		input.age = ''		
	}

	const deleteItem = (id) => {
		setRecord((preValue) => {
			return preValue.filter((index) => {
				return index.id != id;
			})
		})
	}

	const StatusClick = (id) => {
		console.log(id);
		setRecord((pre) => {
			const StatusMap = pre.map((e) => {
				let temp = { name: e.name, gender: e.gender, age: e.age, id: e.id }

				if (e.id == id) {
					if (e.status) {
						temp.status = 0;
					} 
					else {
						temp.status = 1;
					}
					console.log(temp);
				} else {
					temp.status = e.status;
				}
				return temp;
			})
			console.log(StatusMap);
			return StatusMap;
		})
	}

	function Status(props) {
		if (props.status) {
			return <button type="button">Yes</button>
		} else {

			return <button type="button">No</button>
		}
	}

	return (
		<div className="text-style">
			<h2>Member Data</h2>
			<div className="row">				
				<div className="col">
					<label htmlFor="name">Name:</label>
					<input 
						value={input.name} 
						type="text" 
						id="name" 
						placeholder="First Name" 
						name="name"
						className="box-style"
						onChange={handleChange}
					/>
				</div><br/>
				<div className="age">
					<label htmlFor="age">Age:</label>
					<input 
						value={input.age} 
						type="number" 
						id="number" 
						placeholder="Age" 
						name="age"
						onChange={handleChange} 
					/>
				</div><br/>	
                <div className="col">
					<label htmlFor="gender">Gender:</label>
					<input type="radio" 
						value="MALE" 
						name="gender" 
						id="Male" 
						value={input.Male} 
						onChange={handleChange}
					/> Male
					<input 
						type="radio" 
						value="FEMALE" 
						name="gender" 
						id="Female" 
						value={input.Female} 
						onChange={handleChange}
					/> Female
					<input 
						type="radio" 
						value="other" 
						name="gender" 
						id="other" 
						value={input.ther} 
						onChange={handleChange}
					/> Other
				</div><br/>
				<div className="row">
					<button onClick={handleSubmit}>Add Details</button>
				</div><br/> 
			</div>
            <table className="studnet-table" border="1" align="center" width="500px">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.map((e) => {
                            return (
                                <tr>
                                    <td>{e.name}</td>
                                    <td>{e.age}</td>
                                    <td>{e.gender}</td>
                                    <td><a onClick={() => StatusClick(e.id)}> <Status status={e.status} /></a></td>
                                    <td><button type="button" onClick={() => deleteItem(e.id)}>Delete</button></td>
                                </tr>
                            )
                        })
					}
                </tbody>
            </table>
		</div>
	)
}

export default Student;