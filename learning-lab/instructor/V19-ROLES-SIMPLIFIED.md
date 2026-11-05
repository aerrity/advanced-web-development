# v19: Simplified core authorisation module

- 07-01: Correct Tinker role promotion to direct assignment and save (role is deliberately not fillable).
- 07-02: Show exact existing withMiddleware callback, import and complete revised callback; admin book routes before index/show prevents /books/create being swallowed by /books/{book}.
- 07-03: Review existing review owner check and the Edit/Delete interface, exercise both users and existing ReviewTest. No duplication of Module 06 controller work.
- 07-04: Restrict the existing book-management controls in Blade, update existing BookTest mutating actors, and add a book-only RoleAccessTest. Author CRUD is expressly out of scope, with a short note on applying the pattern later.
- 39 core activities across nine modules; 12 optional challenges remain. Other lesson IDs and content remain unchanged.
- Static package checked, but full Laravel/Docker/MySQL integration not executed.
