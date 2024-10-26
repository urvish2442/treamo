"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import ProfilePopover from "@/components/common/ProfilePopover";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import { encodeData } from "@/utils/jwt";
import useMetaData from "@/hooks/useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { TODO_TYPES } from "@/constants/keywords";
import Loader from "@/components/Loader";
import { authState, resetNextCurrentOrderIndex } from "@/redux/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const DeliveryChecklistView = () => {
    // ** Status
    const [checkedTasks, setCheckedTasks] = useState([]);
    // ** Hooks
    const { push } = useRouter();
    const dispatch = useDispatch();
    const [tasks, isTasksLoading] = useMetaData(
        API_ROUTER.GET_TODOS(TODO_TYPES.PRE_DELIVERING),
    );
    useEffect(() => {
        dispatch(resetNextCurrentOrderIndex());
    }, []);

    // ** Handlers
    const onChangeTaskSelection = useCallback((id, isChecked) => {
        setCheckedTasks((prev) =>
            isChecked ? [...prev, id] : prev.filter((item) => item !== id),
        );
    }, []);

    const isAllTasksChecked = useMemo(() => {
        if (tasks && tasks.length > 0) {
            return tasks.every((item, index) => checkedTasks.includes(index));
        }
        return false;
    }, [checkedTasks, tasks]);

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div
                            className="error-block"
                            onClick={() =>
                                push(
                                    `${PATH_DASHBOARD.rider.errors}?returnTo=${encodeData(PATH_DASHBOARD.rider.deliveryChecklist)}`,
                                )
                            }
                        >
                            <img src="/error-img.png" />
                            <span>Error</span>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>

            <div className="common-block-ryder">
                {isTasksLoading ? (
                    <Loader />
                ) : (
                    <div className="shift-idle-block">
                        <div className="clock-img-block">
                            <img alt="" src="/clock-icon.svg" />
                            <span>02:16</span>
                        </div>
                        <div className="shift-idle-block-inner">
                            {tasks && tasks.length > 0
                                ? tasks.map((task, index) => (
                                      <div
                                          className="shift-idle-block-inner-block"
                                          key={index}
                                      >
                                          <div className="shift-idle-block-text">
                                              <img
                                                  alt="calendar-icon"
                                                  src="/calender-icon.svg"
                                              />
                                              <span>{task?.title || "-"}</span>
                                          </div>
                                          <div className="checkbox-custom">
                                              <div className="form-group">
                                                  <input
                                                      type="checkbox"
                                                      id={`rider-${index}`}
                                                      value={checkedTasks.includes(
                                                          index,
                                                      )}
                                                      onChange={({
                                                          target: { checked },
                                                      }) =>
                                                          onChangeTaskSelection(
                                                              index,
                                                              checked,
                                                          )
                                                      }
                                                  ></input>
                                                  <label
                                                      htmlFor={`rider-${index}`}
                                                  ></label>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </div>

                        {isAllTasksChecked ? (
                            <div className="btn-block-shift">
                                <button>
                                    <img src="/start-icon.svg" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </CommonBlock>
    );
};

export default DeliveryChecklistView;
