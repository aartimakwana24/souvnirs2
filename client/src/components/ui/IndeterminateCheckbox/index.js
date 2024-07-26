import { forwardRef, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input
        className="checkbox checkbox-primary"
        key={nanoid()}
        type="checkbox"
        ref={resolvedRef}
        {...rest}
      />
    </>
  );
});

export default IndeterminateCheckbox;
