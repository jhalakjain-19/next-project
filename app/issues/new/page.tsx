'use client';
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface IssueForm {
  title: string;
  description: string; // Ensure this is spelled correctly
}

const NewIssuePage = () => {
  const router = useRouter();
  // Destructuring from useForm
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');

    } catch (error) {
      console.log(error);
      setError('an error occurred')
    }


    // This should log the data on form submission
  };

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className=" space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root aria-label="Title" placeholder="Enter title" {...register('title')} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Description"
              onChange={field.onChange} // Ensure this updates the field value
            />
          )}
        />
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
