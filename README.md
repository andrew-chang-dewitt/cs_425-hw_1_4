# HW 1.4 repo

A homework assignment for IIT's Database Organization (CS 425), Fall 2024.
Drawing an ERD & writing Relation Schema from business rules, using a given example of a Launch Pad & related entities.

## File organization

Final pdf output in `./dist`, generated from markdown (source at [`./src/hw_1_4.md`](src/hw_1_4.md))& mermaid files ([`./src/erd.mmd`](src/erd.mmd)).

## Contributing

Clone this repo & change directories into the repo, then install dependencies:

```
git clone git@andrew-chang-dewitt:cs_425-hw_1_4
cd cs_425-hw_1_4
npm i
```

Edit any source files necessary, then rebuild the pdf using npm:

```
npm run build
```

Updated pdf should be located at `./output/hw_1_4.pdf`.

If you want a live view of the webpage the pdf is printed from during build, you can run `npm run dev` and navigate to `localhost:6149` to see your changes as you make them. This utilizes the same mermaid version & custom styles that the build scripts use, so it will be a more accurate picture of the erd & html/pdf styles from the sources than a general markdown preview tool, such as your IDE's built-in one.
