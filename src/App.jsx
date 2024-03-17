import React, { useState } from "react";
import { studentsData } from "./data/studentsData";
import "./App.css";

const ProgressTracker = () => {
	const [students, setStudents] = useState(studentsData);
	const [gradeDirection, setGradeDirection] = useState("ascending");
	const [attendanceDirection, setAttendanceDirection] = useState("ascending");

	const calculateAverageGrade = (grades) => {
		if (grades.length === 0) return 0;
		const total = grades.reduce((acc, grade) => acc + grade, 0);
		return total / grades.length;
	};

	const getProgressColor = (progress) => {
		if (progress >= 80) return "green";
		if (progress >= 60) return "yellow";
		return "red";
	};

	const handleSort = (key) => {
		const sortedStudents = [...students].sort((a, b) => {
			if (key === "grade") {
				if (gradeDirection === "ascending") {
					setGradeDirection("descending");
					return (
						calculateAverageGrade(a.grades) -
						calculateAverageGrade(b.grades)
					);
				} else {
					setGradeDirection("ascending");
					return (
						calculateAverageGrade(b.grades) -
						calculateAverageGrade(a.grades)
					);
				}
			} else if (key === "attendance") {
				if (attendanceDirection === "ascending") {
					setAttendanceDirection("descending");
					return a.attendance - b.attendance;
				} else {
					setAttendanceDirection("ascending");
					return b.attendance - a.attendance;
				}
			}
			return 0;
		});
		setStudents(sortedStudents);
	};

	const handleFilter = (filterBy) => {
		if (filterBy === "high") {
			const highProgressStudents = studentsData.filter(
				(student) => calculateAverageGrade(student.grades) >= 80
			);
			setStudents(highProgressStudents);
		} else if (filterBy === "moderate") {
			const moderateProgressStudents = studentsData.filter(
				(student) =>
					calculateAverageGrade(student.grades) >= 60 &&
					calculateAverageGrade(student.grades) < 80
			);
			setStudents(moderateProgressStudents);
		} else if (filterBy === "low") {
			const lowProgressStudents = studentsData.filter(
				(student) => calculateAverageGrade(student.grades) < 60
			);
			setStudents(lowProgressStudents);
		} else {
			setStudents(studentsData);
		}
	};

	return (
		<div className="container">
			<h2>Student Progress Tracker</h2>
			<div className="filter-container">
				<label>Filter Data By Progress:</label>
				<select onChange={(e) => handleFilter(e.target.value)}>
					<option value="">--None--</option>
					<option value="high">High</option>
					<option value="moderate">Moderate</option>
					<option value="low">Low</option>
				</select>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th
							className="sort-field"
							onClick={() => handleSort("grade")}
						>
							Average Grade
							<img src="/src/assets/sort.png" alt="sort" />
						</th>
						<th
							className="sort-field"
							onClick={() => handleSort("attendance")}
						>
							Attendance (%)
							<img src="/src/assets/sort.png" alt="sort" />
						</th>
						<th>Progress</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<td>{student.name}</td>
							<td>
								{calculateAverageGrade(student.grades).toFixed(
									2
								)}
							</td>
							<td>{student.attendance}%</td>
							<td>
								<div
									style={{
										width: "100px",
										height: "20px",
										backgroundColor: getProgressColor(
											calculateAverageGrade(
												student.grades
											)
										),
									}}
								></div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProgressTracker;
