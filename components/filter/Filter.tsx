"use client";
import { getCategories } from "@/lib/categories";
import { useI18n } from "@/components/i18n/I18nProvider";


export default function FilterPrograms(){
	const { locale, t } = useI18n();
	const categories = getCategories(locale);

	return(

      <div className="box filter-box">

        <div className="filter-box-header px-6 py-4">
          <h2 className="fnt-green text-[24px] md:text-[30px] font-bold text-center">{t.programs.filterTitle}</h2>
        </div>

         <div className="filter-box-body px-6 py-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1">

			{categories.map((category) => (
			  <fieldset key={category.id}>

			    <legend className="font-bold fnt-green text-[20px] md:text-[24px]">
			      {category.parent}
			    </legend>

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
			            w-5 h-5 shrink-0
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

			  </fieldset>
			))}

         </div>

      </div>
	);
}
