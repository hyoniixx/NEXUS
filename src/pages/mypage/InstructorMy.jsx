import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./InstructorMy.css";

function InstructorMy() {
  return (
    <section className="instructor-my-page">
      <div className="instructor-my-inner">
        <div className="instructor-my-header">
          <h1 className="instructor-my-title">내 강의</h1>
          <p className="instructor-my-description">
            강의와 수강생을 관리하세요
          </p>
        </div>

        <div className="instructor-my-tab-bar">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive
                ? "instructor-my-tab instructor-my-tab-active"
                : "instructor-my-tab"
            }
          >
            강의 조회
          </NavLink>

          <NavLink
            to="students"
            className={({ isActive }) =>
              isActive
                ? "instructor-my-tab instructor-my-tab-active"
                : "instructor-my-tab"
            }
          >
            수강생 조회
          </NavLink>
        </div>

        <div className="instructor-my-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default InstructorMy;
