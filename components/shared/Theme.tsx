"use client";
import React from "react";
import { useTheme } from "@/app/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants/Constants";
const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <div>
      <div className="">
        <Menubar className="relative border-none bg-transparent shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="focus:bg-light-900 data-[state-open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state-open]:bg-dark-200">
              {mode === "light" ? (
                <Image
                  src="/assets/icons/sun.svg"
                  height={20}
                  width={20}
                  alt="sun"
                />
              ) : (
                <Image
                  src="/assets/icons/moon.svg"
                  height={20}
                  width={20}
                  alt="moon"
                />
              )}
            </MenubarTrigger>
            <MenubarContent
              className="absolute right-[-1rem] top-[-1rem] min-w-[120px] rounded border py-2
            dark:border-dark-400 dark:bg-dark-300
            "
            >
              {themes.map((item) => {
                return (
                  <MenubarItem
                    key={item.value}
                    className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
                    onClick={() => {
                      setMode(item.value);

                      if (item.value !== "system") {
                        localStorage.theme = item.value;
                      } else {
                        localStorage.removeItem("theme");
                      }
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      height={16}
                      width={16}
                      className={`${mode === item.value && "active-theme"}`}
                    />
                    <p
                      className={`${
                        mode === item.value
                          ? "text-primary-500"
                          : "text-dark100_light900"
                      } body-semibold text-light-500`}
                    >
                      {item.label}
                    </p>
                  </MenubarItem>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Theme;
