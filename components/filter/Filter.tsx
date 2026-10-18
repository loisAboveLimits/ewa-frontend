"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Filter.module.css";
import { categories } from "@/lib/categories";


export default function FilterPrograms(){
	return(

      <div className="box filter-box">

        <div className="filter-box-header px-6 py-4">
          <h2 className="fnt-green text-[30px] font-bold text-center">Filter Programs</h2>
        </div>

         <div className="filter-box-body px-6 py-4">

			{categories.map((category) => (
			  <div key={category.id}>

			    <p className="font-bold fnt-green text-[24px]">
			      {category.parent}
			    </p>

			    <div className="spacer-10"></div>

			    {category.children.map((child) => (
			      <label
			        key={`${category.id}-${child.id}`}
			        className="flex items-center gap-3 cursor-pointer"
			      >
			        <input
			          type="checkbox"
			          name={category.id}
			          value={child.id}
			          className="
			            w-5 h-5
			            appearance-none
			            border-2
			            rounded
			            checked:bg-teal-500
			            checked:border-teal-500
			            cursor-pointer
			            filter-cb
			          "
			        />

			        <span className="fnt-green">
			          {child.name}
			        </span>
			      </label>
			    ))}

			    <div className="spacer-40"></div>

			  </div>
			))}     	

         </div>

      </div>
	);
}
 