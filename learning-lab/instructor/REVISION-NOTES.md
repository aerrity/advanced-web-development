# Student walkthrough revisions — 02 November 2026

Student feedback applied to the existing 35-activity course. Existing activity identifiers, navigation, progress storage key, optional completed-source references and original Laravel repository remain unchanged.

## Revisions

- **01-03:** Student-focused setup objective; explains what Laravel migrations do, why they belong in source control, how `migrate` and `migrate:status` differ, and how to verify the initial database and welcome page.
- **01-04:** Explains that `php artisan route:list --path=books` independently confirms the GET route is registered.
- **02-01:** Removes references to a six-week schedule, replaces defensive limitations with a factual description of authentication/authorisation, adds a short Eloquent introduction, and corrects references to when Breeze and controllers are introduced. Removes unsupported assertions about the tutorial site being served from Laravel's `public` folder.
- **02-02:** Uses distinct section headings. Makes the four migration creation commands explicit; clarifies timestamp/dependency ordering; requests one `migrate --step` action and a separate status check; clearly labels rollback as optional reference rather than a required action.
- **02-03:** Rebuilds the activity as executable steps: generate Book, Author and Review models using Artisan, replace generated classes with valid initial PHP models, add User::reviews() to the existing model, then create a book and author through Tinker and verify the pivot row. Removed assumed previous Active Record work and repetitive headings.

## Verification performed

- 35 lessons retained, original IDs unchanged.
- 61 optional completed-source references compared character-for-character (aside from outer whitespace) with corresponding paths in the supplied finished repository archive; all matched.
- Three new initial model files linted with `php -l`; all passed.
- Model relationship method signatures checked against the finished models.
- `node --check` on the lesson content passed. Common site application script and CSS unchanged.
- The full Laravel app/test suite and Docker walkthrough have not been executed in this environment. The user's manual sequential walkthrough is still the main acceptance test.

## Student walkthrough v4 (2026-11-02)
- Student feedback implemented: 02-03 phpMyAdmin instructions; 02-04 explicit test creation and nonrepetitive headings; 03-01 previous Composer/npm experience acknowledged; site-wide repeated section headings and cross-lesson duplicate paragraphs removed.
- New BookTest, AuthorTest, ReviewTest examples are intentionally pre-factory versions (the optional completed source references contain later modifications).
- Tests were PHP-syntax-checked, but not run under Laravel/MySQL. RefreshDatabase may apply migrations and should not be treated as preserving existing data in every setup.


### v5 seeding correction
- Reported error: `Class "Database\Seeders\User" not found`. The class resolution occurs in `UserSeeder.php` when `User::factory()` is called without `use App\Models\User;`.
- Replaced partial seeder snippets with five full repo-matched files and clear generate/edit/run steps in 03-03.
- Flagged that `migrate:fresh --seed` destroys existing rows and is appropriate only for a disposable database.

### v6 routing correction
- 04-01 replaced: full BookController and AuthorController classes, Artisan commands, explicit deletion of the prior `/books` closure route, controller imports, insertion of two resource routes into the existing Breeze `auth` group and independent `route:list` checks.
- Confirmed controller imports, method names and relationship calls against supplied finished repository. These examples represent an intermediate stage; they are not intended to equal the later finished controllers in full.


### v7 browser-first Blade revision
- 04-01 updated for Breeze rewriting routes/web.php; old /books closure removal is conditional.
- 04-02/03 rebuilt around seven explicit view files (including review partial) with complete intermediate snippets, staged browser checks and valid routes only.
- 04-04 includes complete initial feature and seeder test classes; source reference panels stay retained.
- Bundled two placeholder images copied unmodified from the finished repo.
- Student-facing examples in 04-02 omit later create/edit/search/delete buttons and do not claim to match final repository snapshots byte-for-byte.


### v8: Plain-language student experience

Removed 61 completed-source reference panels from student lessons (the original instructor verification record is retained); revised 35 lead descriptions; expanded 03-01 registration/logout/login instructions. No Laravel teaching-code samples were changed.


### v9: Module 05 instructional repair

Activities 05-01 to 05-04 have complete incremental files, location-specific edit instructions and browser checkpoints. Early 05-01 introduces minimal request validation, then 05-02 expands rules and user-facing feedback. Controller and view end states match the repository's CRUD code except for search features reserved for later lessons. Existing quiz IDs and answer keys are retained.


### v10: complete rewrite of Modules 06–08
Replaced partial, ambiguous examples with sequential controller, route, Blade, model and test instructions. Added checkpoints for browser paths and tests; corrected instructional ordering, class imports, test helper dependencies and premature claims about features. Source comparisons use user-provided repository archive; full Docker/MySQL walkthrough not executed. Modules 01–05 unchanged.

## v11: missing navigation setup

The v10 Module 06 My Reviews exercise referenced existing Books/Authors links, but Module 04 never asked students to create those links. Activity 04-03 now adds both desktop and responsive links to Breeze navigation with explicit insertion points and a browser checkpoint; 06-03 now references that activity. The finished repository `src/resources/views/layouts/navigation.blade.php` confirms these exact components and route names.
