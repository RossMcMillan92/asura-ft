# Design

## The unchosen

**Design 1** wasn't chosen as its function is unclear at a glance; the full design has to be scanned before realising what it is and how it works. While a kanban-styled list may be a good solution for more complex systems, using this layout for only two columns is overkill.

**Design 3** wasn't chosen only because the additional borders added visual clutter. While they serve well to separate the todo items, the same separation can be achieved with careful spacing and sizing, with the bonus of being more visually appealing.

## The chosen

**Design 2** was chosen, as it provides a clear and recognisable UI to build upon.

#### Alterations

- The original checkboxes, being circular, looked a little too much like radio buttons which could confuse the user. Changing these to a squarer shape brought them more inline with common multi-checkable UIs. While the shape change was probably proficient enough for this clarity, I also added the tick icon to give more of the feeling that the user is checking an item off a list. Animations bring a polished feel to the final component.
- The general design has been polished, making it feel more modern and professional. It is responsive across screen sizes to accommodate different devices.

#### Additions

- A delete button was added to each todo item to allow its removal. This button is hidden until hovered over on desktop to minimise clutter. It is shown at all times on smaller screens, and any device which doesn't allow for the use of "hover".
- A form was added to allow the submission of new todo items. The form can't be submitted when empty.
- A "You're all done" message was added when the todo list is empty. This gives the user additional feedback and prevents the UI from looking broken.

## Accessibility

#### Keyboard navigation / Screen readers

The app is entirely navigable by keyboard, and all UI elements take focus in a logical order. A few notable points:

- All elements are correctly set up with aria tags to label inputs and buttons, including the icon buttons.
- When a todo item's delete button is focused and then pressed, the markup is removed from the page, leaving the browser wondering where to put the focus next (different browsers/screen readers behave differently). We could focus on the next todo item, but the just-deleted one may have been the last. Instead, the focus is moved to the title of the list ("To Do"), which is linked to the todo list container with aria tags.
- A screen reader won't automatically announce updates to the markup in a page, in this case adding and deleting items. To give a better experience, a visually hidden "announcer" is included in the app, set up with aria-live tags. A semantic message is inserted when a todo is added or removed, which a screen reader will read to the user.
