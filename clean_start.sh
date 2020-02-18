#! /bin/bash

REMOVE=(
    processing
    node_modules
    dais.css
    dais.min.css
    dais.min.css.map
)
# rm -rf ./processing
# rm -rf ./node_modules
# rm dais.css
# rm dais.min.css
# rm dais.min.css.map

for i in ${REMOVE[@]}; do
    if [[ -f $i ]]; then
        rm $i
        continue
    fi
    if [[ -d $i ]]; then
        rm -rf $i
        continue
    fi
done
#! figure out a way to re install based on package manager npm/yarn/pnpm
pnpm i
exit 0
