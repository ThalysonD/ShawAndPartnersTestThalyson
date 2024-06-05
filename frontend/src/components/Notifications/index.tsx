"use client";

import React, { Fragment, useMemo } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCsvData } from "@/context/CsvContext";
import { LordIcon } from "../LordIcon";

const Notifications: React.FC = () => {
  const { uploadLogs, clearAllNotifications } = useCsvData();

  const hasNotifications = useMemo(() => uploadLogs.length > 0, [uploadLogs]);

  return (
    <Popover className="relative">
      <Popover.Button className="relative inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <LordIcon
          src="https://cdn.lordicon.com/xkcqznly.json"
          trigger="loop"
          colors={{ primary: "#1e21c9", secondary: "#1e21c9" }}
          size={28}
        />
        {hasNotifications && (
          <span className="absolute top-3 right-4 inline-flex items-center justify-center h-4 w-4 text-xs font-semibold text-white bg-red-500 rounded-full">
            {uploadLogs.length}
          </span>
        )}
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-full z-10 mt-5 flex w-screen max-w-max -translate-x-[320px] md:-translate-x-3/3 px-4 sm:px-0">
          <div className="w-screen max-w-sm flex-auto rounded-3xl bg-white p-8 text-sm leading-6 shadow-lg ring-1 ring-black/5 overflow-y-auto max-h-96">
            {uploadLogs.length === 0 ? (
              <div className="p-4 text-gray-500">No notifications</div>
            ) : (
              <>
                {uploadLogs.map((log, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg p-4 hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">
                      {log.message}
                    </span>
                    <p className="mt-1 text-gray-600">{log.date}</p>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  className="mt-4 w-full bg-secondary text-white rounded-md py-2 hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Clear Notifications
                </button>
              </>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Notifications;
