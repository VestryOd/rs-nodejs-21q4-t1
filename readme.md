# RSSchool Node.js task 1

## CLI Cipher tool

#### _To run the application, enter the ***node index.js*** command in the command line with the followed options._


##### `-c`, `--config`: config option which describes order and direction of ciphers. Config is a string with pattern `{XY(-)}n`, where:


`X` is a cipher mark:

         C is for Caesar cipher (with shift 1)

         A is for Atbash cipher
        
         R is for ROT-8 cipher

`Y` is flag of encoding or decoding

(mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)

         1 is for encoding

         0 is for decoding


##### `-i`, `--input`: String with path to input file


##### `-o`, `--output`: String with path to output file

##### _For example, command with config "C1-C1-R0-A" executes ciphers in such order "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"_