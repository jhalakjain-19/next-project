'use client';
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
type IssueForm = z.infer<typeof createIssueSchema>;

import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from '@/app/ValidationSchemas'
const NewIssuePage = () => {
  const router = useRouter();
  // Destructuring from useForm
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
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
        {errors.title && <p color="red">{errors.title.message}</p>}
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
        {errors.description && <p color='red'>{errors.description.message}</p>}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
