'use client';
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string; // Ensure this is spelled correctly
}

const NewIssuePage = () => {
  const router = useRouter();
  // Destructuring from useForm
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
    console.log(data); // This should log the data on form submission
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
  );
}

export default NewIssuePage;
