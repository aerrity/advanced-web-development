# Book Reviews Learning Lab — complete teaching edition

Static educational companion site, derived from the seven-activity Module 01 site and the user-supplied original Laravel repository and published notes. Contains **39 detailed activities across 9 modules**, all browsable from `index.html`. The Laravel application remains **unchanged**.

## How to open

Extract the ZIP. Open `index.html` in a browser, or serve the folder with `python -m http.server 8000` and visit http://localhost:8000. GitHub Pages can host the folder directly, including `.nojekyll`. There is no build step.

## What is included

- Module 01 preserves the seven working starter lessons and the `lesson-01-topic-01` checkout instructions.
- Modules 02–08 have 28 expanded, hands-on activities grounded in all 25 substantive topic pages in the published tutorial.
- Step-by-step teaching-code panels throughout the course. The finished application is linked only from the site footer.
- Every expanded lesson includes a concrete task, an observable completion check, a concept question, a troubleshooting tip and links to the original teaching material.
- Code copy, answer checking, responsive navigation, progress tracking, local save, progress export/import and completion markers remain functional.

## Source verification and important distinction

Expanded lessons were constructed from the original tutorial HTML in the user-supplied repository archive `book-reviews-student-main(1).zip` and checked against its finished Laravel source tree. The repository structure and `BookController.php` were additionally inspected on live GitHub on 2026-11-02. The original verification of finished source references is retained as instructor documentation in `instructor/verification.json`; these panels are no longer shown in the learning site.

Many original tutorial snippets intentionally represent an *intermediate stage* of development. Some therefore do not appear verbatim in the final code. The student interface presents teaching steps without provenance labels. Detailed source verification belongs in the `instructor/` folder. Students can follow the footer link to browse the completed repository if needed. In particular, the correct final Book relationship is `authors()` (plural, many-to-many); the finished `BookController@index()` uses `with('authors')`, review aggregates, search and pagination. The lesson code remains focused on the step students are currently building.

The finished Laravel application was not executed end-to-end in this revision. The new Module 02 test examples passed PHP syntax checks, and the learning website files passed JavaScript syntax checks. Students should continue verifying each stage in their own Docker workspace. The course should be walked through in a fresh student checkout before classroom deployment.

## Development and deployment

- `lessons.js` holds the lesson data, explanations and hands-on code examples.
- `app.js` renders the shared responsive site.
- `style.css` styles the site, including code panels and accessible progress controls.
- `assets/iadt-logo.png` is a site asset.
- `instructor/verification.json` lists build verification results.

The localStorage key remains `book-reviews-learning-lab:v1` and the original 35 activity IDs are retained as renumbered in the v18 core-module addition, so learners should retain previous completion history.

Original notes: https://john-dempsey.github.io/book-reviews-student/

Original source: https://github.com/john-dempsey/book-reviews-student

## Student interface revision

Student lessons show code in context, with file paths where appropriate. Provenance/audit labels have been removed from code panels, further-reading links and help prompts. The completed-implementation panels have been removed from every lesson. Internal verification data remain in `instructor/`.

## Student walkthrough revisions (02 November 2026)

Activities **01-03**, **01-04**, **02-01**, **02-02** and **02-03** were updated in response to the initial student walkthrough. The changes improve the explanation of migrations, route verification, Eloquent, and the step-by-step generation of the actual PHP model classes. See `instructor/REVISION-NOTES.md` for details. No original Laravel repository files were changed.

## Walkthrough revision v4

- **02-03:** Ends with an explicit phpMyAdmin check of the `books`, `authors` and `author_book` rows added via Tinker.
- **02-04:** Rewritten with `php artisan make:test ... --unit`, complete runnable pre-factory test classes, class imports, test commands and guidance on database testing risks. New test classes have passed `php -l` syntax checks; Laravel integration execution is still for the hands-on walkthrough.
- **03-01:** Reworded Composer/npm as tools used during setup, then introduced Breeze as the new addition.
- **Entire site:** Repeated section headers within a lesson now become continuous explanation instead of identical successive H2 headings. Actual duplicate instructional paragraphs spanning adjacent lessons have been removed or replaced, particularly in 03-04, 04-02/03 and 07-04.
- All 35 lesson IDs, quizzes, copy buttons and progress keys remain unchanged; the former completed-source panels are removed.


## Walkthrough v5 correction (seeders)

Activity 03-03 now provides the complete UserSeeder, AuthorSeeder, BookSeeder, ReviewSeeder and DatabaseSeeder files, with model imports and commands to generate the seeder classes. The examples were compared byte-for-byte with the supplied finished repository snapshot.

## Walkthrough v6 correction: 04-01 catalogue routing

- Acknowledges that Module 01 created a temporary `/books` route and explicitly instructs students to remove it before registering the new resource route.
- Gives commands to generate both controllers, full intermediate controller code and exact edit points in `routes/web.php`.
- Clarifies that `route:list` is the checkpoint here; the browser pages are completed in 04-02 and 04-03.
- Existing lesson IDs, progress storage and repository references are unchanged.


## Walkthrough v7 (04-01 to 04-04)

- 04-01: Breeze may rewrite `routes/web.php`; inspect and remove an old `/books` closure route only if it is still present.
- 04-02: complete, ready-to-create `books/partials/card.blade.php`, `books/index.blade.php`, `reviews/partials/review.blade.php`, and `books/show.blade.php`; checks at `/books` and `/books/{id}`.
- 04-03: complete `authors/partials/card.blade.php`, `authors/index.blade.php`, and `authors/show.blade.php`; browser checks at `/authors` and `/authors/{id}` and book-to-author links.
- 04-04: full initial feature tests, complete seeder test, explicit generate/run commands and browser check before tests.
- `starter-assets/` includes the two unchanged placeholder images from the reference repository for students to copy into Laravel's `public/images/`.
- The student-facing examples in 04-02 deliberately omit links to create/edit/review actions that are introduced only in later modules.

## Walkthrough v8 (clearer lesson introductions and Breeze checkpoint)

- Removed all 61 optional **View completed implementation** panels from the student lessons. The finished application remains linked in the footer; instructor verification records remain separately available.
- Rewrote all 35 one-line explanations beneath lesson titles in simpler, task-focused language. The teaching content and code examples are unchanged.
- In 03-01, added explicit steps to register a local test account at `/register`, confirm the dashboard, log out and sign back in at `/login`. Students finish the lesson logged in.
- Added a note in 03-01 that Breeze may replace `routes/web.php`, which explains why the temporary Module 01 `/books` route may have disappeared.
- All lesson IDs and the progress-storage key are unchanged, preserving existing student progress.

## Walkthrough v9 (Module 05 rebuilt)

- Rebuilt Module 05, activities 01–04, as sequential file-by-file instructions with explicit create, replace and insert actions.
- Added complete Blade templates, route changes, controller methods and browser checkpoints at each stage.
- The first create form uses safe minimal validation; 05-02 adds all bibliographic fields and error repopulation. 05-03 moves the shared form to a partial and adds cover uploads and edit/update actions. 05-04 adds delete and seven feature tests.
- The earlier modules and Modules 06–08 are unchanged. Student progress keys and quiz answer IDs are preserved.
- PHP examples are linted and compared against the supplied repo where appropriate, but a Docker/MySQL end-to-end walkthrough has not been performed.


## Walkthrough v10 (Modules 06–08 rebuilt)

- Rewrote the final 12 activities with file-by-file instructions, complete classes where files are created or replaced, explicit imports, and browser checkpoints.
- Module 06 now builds review creation, owner-only edit/delete, a personal reviews page and feature tests in sequence.
- Module 07 introduces a title-only search first, then expands it to authors and years, adds model and HTTP tests, and verifies empty results and pagination.
- Module 08 tests My Reviews and N+1 queries with complete runnable classes, then adds a short handoff and a final checklist.
- Modules 01–05, lesson IDs, progress keys, quizzes/navigation functionality and styling are preserved. The Laravel repository itself remains untouched.
- PHP code fragments were syntax-checked where possible. No end-to-end Laravel Docker/MySQL test was run; the student walkthrough remains necessary.

## Walkthrough v11 (Module 04 navigation)

- **04-03:** Added an explicit edit to `src/resources/views/layouts/navigation.blade.php` for both desktop (`x-nav-link`) and mobile (`x-responsive-nav-link`) Books/Authors links, after page routes have been verified; included browser checks for both layouts.
- **06-03:** Now refers back to the navigation added in 04-03, and tells students to insert My Reviews after Authors in each list.
- Unchanged: the Laravel repository, all existing code samples, lesson IDs, completion-storage key, quizzes and other lessons.


## Advanced extensions (v15)

Four independent optional extensions follow the 35-step core path: reading lists, ratings and recommendations, administration/permissions, and interactive search. There are three challenge-based activities per extension (12 total); these are briefs, not complete implementation recipes. The sidebar and home page present extensions separately, and their completion counts are independent of core progress.

## v16: Scaffolded advanced extensions (05 November 2026)

All 12 independent extension activities (E1–E4) now provide an explicit starting point, file-level implementation roadmap, three progressively revealing hints with optional small code clues, verification checklist and stretch goal. The core 35 lessons, their activity IDs and the progress storage key are unchanged. Hints use native expandable disclosure controls. No additional Laravel application code is distributed as a finished solution.


## V17 teaching update

E3 Administration and Permissions and E4 Interactive Search have additional guided checkpoints, minimal code examples, targeted troubleshooting and testing tasks. The independent challenge approach is retained.

## v19: Simplified roles walkthrough

The new Module 07 focuses only on user/admin role assignment, protecting book management, UI adjustments, and verifying existing review ownership. Detailed author CRUD instructions are removed. See `instructor/V19-ROLES-SIMPLIFIED.md`.


## Optional extension E4: Design a better book experience

Three independent, supported design challenges extend the existing Blade/Tailwind interface: polishing the existing responsive grid (which is already three columns at large widths), redesigning the book-detail view, and improving form usability/feedback. No additional front-end framework or backend feature is needed.
