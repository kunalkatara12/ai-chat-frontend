import { toast, Toaster, ToastBar } from 'react-hot-toast';

function CustomToast() {
  return (

<Toaster>
  {(t) => (
    <ToastBar toast={t}>
      {({ icon, message }) => (
        <>
          {icon}
          {message}
          {t.type !== 'loading' && (
            <button onClick={() => toast.dismiss(t.id)}>X</button>
          )}
        </>
      )}
    </ToastBar>
  )}
</Toaster>
  )
}

export default CustomToast