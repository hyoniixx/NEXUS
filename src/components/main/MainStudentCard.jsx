import React from 'react'

function MainStudentCard({ image, name, date, status }) {
    var color = { background: "rgba(240, 177, 0, 0.10)", color: "#D08700" };
    var text = "대기 중"
    switch (status) {
        case "1": //대기중:1, 진행중:2,완료:3
            color.background = "rgba(240, 177, 0, 0.10)";
            color.color = "#D08700";
            text = "대기 중"
            break;
        case "2":
            color.background = "rgba(255, 105, 0, 0.20)";
            color.color = "#FF6900";
            text = "진행 중"
            break;
        case "3":
            color.background = "rgba(0, 201, 80, 0.10)";
            color.color = "#00C950";
            text = "완료"
            break;
        default:
            color.background = "rgba(240, 177, 0, 0.10)";
            color.color = "#D08700";
            text = "대기 중"
            break;
    }
    return (
        <div className='studentCard'>
            <img src={image} alt="" className='studentProfile' />
            <div className='studentContent'>
                <h3>{name}</h3>
                <p>{date}</p>
            </div>
            <div className='studentStatus' style={color}>
                {text}
            </div>
        </div>
    )
}

export default MainStudentCard
