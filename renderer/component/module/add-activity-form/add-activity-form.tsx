/* eslint-disable react/jsx-closing-bracket-location */

import {ReactElement} from "react";
import {Controller} from "react-hook-form";
import {ProjectSelect} from "/renderer/component/atom/project-select";
import {create} from "/renderer/component/create";
import {useAddActivity} from "./add-activity-form-hook";


export const AddActivityForm = create(
  require("./add-activity-form.scss"), "AddActivityForm",
  function ({
    className
  }: {
    className?: string
  }): ReactElement {

    const {form, handleSubmit} = useAddActivity();

    return (
      <form styleName="root" className={className} onSubmit={handleSubmit}>
        <Controller name="project" control={form.control} render={({field}) => (
          <ProjectSelect value={field.value} onSet={field.onChange}/>
        )}/>
        <button type="submit">送信</button>
      </form>
    );

  }
);