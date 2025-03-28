/* eslint-disable react/jsx-closing-bracket-location */

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSparkles} from "@fortawesome/sharp-light-svg-icons";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Controller} from "react-hook-form";
import {IconButton} from "/renderer/component/atom/icon-button";
import {Input} from "/renderer/component/atom/input";
import {ProjectSelect} from "/renderer/component/atom/project-select";
import {create} from "/renderer/component/create";
import {useAddActivity} from "./add-activity-form-hook";


export const AddActivityForm = create(
  require("./add-activity-form.scss"), "AddActivityForm",
  function ({
    date,
    className
  }: {
    date: Dayjs,
    className?: string
  }): ReactElement {

    const {form, handleSubmit} = useAddActivity(date);

    return (
      <form styleName="root" className={className} onSubmit={handleSubmit}>
        <Controller name="project" control={form.control} render={({field}) => (
          <ProjectSelect value={field.value} onSet={field.onChange}/>
        )}/>
        <div styleName="footer">
          <Input styleName="input" {...form.register("timeString")}/>
          <IconButton type="submit">
            <FontAwesomeIcon icon={faSparkles}/>
          </IconButton>
        </div>
      </form>
    );

  }
);