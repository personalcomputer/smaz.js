class SMAZ
	@reverse_codebook: [" ", "the", "e", "t", "a", "of", "o", "and", "i", "n", "s", "e ", "r", " th", " t", "in", "he", "th", "h", "he ", "to", "\r\n", "l", "s ", "d", " a", "an","er", "c", " o", "d ", "on", " of", "re", "of ", "t ", ", ", "is", "u", "at", "   ", "n ", "or", "which", "f", "m", "as", "it", "that", "\n", "was", "en", "  ", " w", "es", " an", " i", "\r", "f ", "g", "p", "nd", " s", "nd ", "ed ", "w", "ed", "http://", "for", "te", "ing", "y ", "The", " c", "ti", "r ", "his", "st", " in", "ar", "nt", ",", " to", "y", "ng", " h", "with", "le", "al", "to ", "b", "ou", "be", "were", " b", "se", "o ", "ent", "ha", "ng ", "their", "\"", "hi", "from", " f", "in ", "de", "ion", "me", "v", ".", "ve", "all", "re ", "ri", "ro", "is ", "co", "f t", "are", "ea", ". ", "her", " m", "er ", " p", "es ", "by", "they", "di", "ra", "ic", "not", "s, ", "d t", "at ", "ce", "la", "h ", "ne", "as ", "tio", "on ", "n t", "io", "we", " a ", "om", ", a", "s o", "ur", "li", "ll", "ch", "had", "this", "e t", "g ", "e\r\n", " wh", "ere", " co", "e o", "a ", "us", " d", "ss", "\n\r\n", "\r\n\r", "=\"", " be", " e", "s a", "ma", "one", "t t", "or ", "but", "el", "so", "l ", "e s", "s,", "no", "ter", " wa", "iv", "ho", "e a", " r", "hat", "s t", "ns", "ch ", "wh", "tr", "ut", "/", "have", "ly ", "ta", " ha", " on", "tha", "-", " l", "ati", "en ", "pe", " re", "there", "ass", "si", " fo", "wa", "ec", "our", "who", "its", "z", "fo", "rs", ">", "ot", "un", "<", "im", "th ", "nc", "ate", "><", "ver", "ad", " we", "ly", "ee", " n", "id", " cl", "ac", "il", "</", "rt", " wi", "div", "e, ", " it", "whi", " ma", "ge", "x", "e c", "men", ".com"]

	@codebook = SMAZ.reverse_codebook.reduce (acc, key, i) ->
		acc[key] = i
		acc
	, {}

	@flush_verbatim: (verbatim) ->
		output = []
		if verbatim.length > 1
			output.push String.fromCharCode 255
			output.push String.fromCharCode verbatim.length - 1
		else
			output.push String.fromCharCode 254

		for k in verbatim
			output.push k

		output

	@compress: (input) ->
		verbatim = ''
		output = []
		input_index = 0

		while input_index < input.length
			encoded = false
			j = 7
			if input.length - input_index < 7
				j = input.length - input_index

			for j in [j...0]
				code = SMAZ.codebook[input.substr input_index, j]
				if code?
					if verbatim
						output = output.concat SMAZ.flush_verbatim verbatim
						verbatim = ''

					output.push String.fromCharCode code
					input_index += j
					encoded = true
					break

			if not encoded
				verbatim += input[input_index]
				input_index++

				if verbatim.length is 256
					output = output.concat SMAZ.flush_verbatim verbatim
					verbatim = ''

		if verbatim
			output = output.concat SMAZ.flush_verbatim verbatim

		output.join ''

	@decompress: (str_input) ->
		output = ''
		input = (str_input.charCodeAt i for i in [0...str_input.length])
		i = 0
		while i < input.length
			if input[i] is 254
				if i + 1 > input.length
					throw 'Malformed SMAZ'
				output += str_input[i+1]
				i += 2

			else if input[i] is 255
				if i + input[i + 1] + 2 >= input.length
					throw 'Malformed SMAZ'
				for j in [0...input[i+1]+1]
					output += str_input[i+2+j]
				i += 3 + input[i+1]

			else
				output += SMAZ.reverse_codebook[input[i]]
				i++
		output

if module and module.exports
	module.exports = SMAZ