import { PrimaryButton } from '@/components/notes/ui/primary-button';
import Form from 'next/form'


export default async function NewNote() {
  return (
      <>
        <h1 className="text-3xl text-center mb-6">Nowa notatka</h1>
        <Form action='' className='flex flex-col'>
          <input type="text" name="title" placeholder="Tytuł" className='mb-2 text-xl bg-background-secondary p-2 rounded-xl outline-none' />
          <textarea name="content" placeholder='Treść' className='mb-2 h-96 text-xl bg-background-secondary p-2 rounded-xl outline-none resize-none'></textarea>
          <div className='flex justify-center'>
            <PrimaryButton label='Zapisz'/>
          </div>
        </Form>
      </>
  );
}
