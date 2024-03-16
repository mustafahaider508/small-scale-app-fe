import React, { useState } from "react";
import { OrderChart } from "./OrderChart";
import PieChart from "./PieChart";

const firstChartMockData = [120, 40, 240, 0, 160, 120, 200, 80, 220];
const secondChartMockData = [100, 150, 120, 100, 190, 200, 250, 120, 50];

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
const Dashboard = () => {
  const [orderChartTab, setOrderChartTab] = useState([
    { name: "Monthly", active: true },
    { name: "Weekly", active: false },
    { name: "Today", active: false },
  ]);

  const handleItemClick = (clickedTabIndex: number) => {
    const updatedTabs = orderChartTab.map((tab, index) => ({
      ...tab,
      active: index === clickedTabIndex,
    }));
    setOrderChartTab(updatedTabs);
  };

  const [analyticTab, setAnalyticTab] = useState([
    { name: "Monthly", active: true },
    { name: "Weekly", active: false },
    { name: "Today", active: false },
  ]);

  const handleAnaylticClick = (clickedTabIndex: number) => {
    const updatedTabs = analyticTab.map((tab, index) => ({
      ...tab,
      active: index === clickedTabIndex,
    }));
    setAnalyticTab(updatedTabs);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="w-full lg:w-[50%] bg-[#FFFFFF] rounded-[10px] py-4 ">
          <div className="flex items-center justify-between px-5">
            <div className="space-y-[7px]">
              <h1 className="text-[#000000] font-medium text-xl">
                Orders Chart
              </h1>
              <p className="text-[#969BA0] text-xs font-normal">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-[#969BA0] text-xs font-normal">
                  Total Sales
                </p>
                <span className="text-[#000000] text-base font-semibold">
                  257k
                </span>
              </div>

              <div>
                <p className="text-[#969BA0] text-xs font-normal">
                  Avg. Sales per day
                </p>
                <span className="text-[#000000] text-base font-semibold">
                  1,245
                </span>
              </div>
            </div>
          </div>
          {/* underline tabs */}
          <div className="px-5">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
                {orderChartTab.map((tab, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleItemClick(index)}
                    className={classNames(
                      tab.active
                        ? "border-[#009FE3] text-[#111827]"
                        : "border-transparent text-[#7A7C86] ",
                      "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={tab.active ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className=" px-1 pt-4 w-full">
            <OrderChart chartData={firstChartMockData} />
          </div>
        </div>

        <div className="w-full lg:w-[50%] bg-[#FFFFFF] rounded-[10px] py-4">
          <div className="flex items-center justify-between px-5">
            <div className="space-y-[7px]">
              <h1 className="text-[#000000] font-medium text-xl">
                User Analytics
              </h1>
              <p className="text-[#969BA0] text-xs font-normal">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-[#969BA0] text-xs font-normal">
                  Total Users
                </p>
                <span className="text-[#000000] text-base font-semibold">
                  257k
                </span>
              </div>

              <div>
                <p className="text-[#969BA0] text-xs font-normal">
                  Avg. Users per day
                </p>
                <span className="text-[#000000] text-base font-semibold">
                  1,245
                </span>
              </div>
            </div>
          </div>

          {/* underline tabs */}
          <div className="px-5">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
                {analyticTab.map((tab, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleAnaylticClick(index)}
                    className={classNames(
                      tab.active
                        ? "border-[#009FE3] text-[#111827]"
                        : "border-transparent text-[#7A7C86] ",
                      "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={tab.active ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className=" px-1 pt-4 w-full">
            <OrderChart chartData={secondChartMockData} />
          </div>
        </div>
      </div>

      <div className="w-full mt-[50px] lg:w-[50%] bg-[#FFFFFF] rounded-[10px] py-4 ">
        <div className="flex items-center justify-between px-5">
          <div className="space-y-[7px]">
            <h1 className="text-[#000000] font-medium text-xl">Pie Chart</h1>
            <p className="text-[#969BA0] text-xs font-normal">
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-[#969BA0] text-xs font-normal">Total Sales</p>
              <span className="text-[#000000] text-base font-semibold">
                257k
              </span>
            </div>

            <div>
              <p className="text-[#969BA0] text-xs font-normal">
                Avg. Sales per day
              </p>
              <span className="text-[#000000] text-base font-semibold">
                1,245
              </span>
            </div>
          </div>
        </div>
        {/* underline tabs */}
        <div className="px-5">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
              {orderChartTab.map((tab, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleItemClick(index)}
                  className={classNames(
                    tab.active
                      ? "border-[#009FE3] text-[#111827]"
                      : "border-transparent text-[#7A7C86] ",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={tab.active ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className=" px-1 pt-4 w-full">
          <PieChart chartData={secondChartMockData} />
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
