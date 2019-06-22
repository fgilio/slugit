const slugify = string => {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with ‘and’
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

module.exports = async (req, res) => {
    if (!req.query.input && !req.body.input) {
        return res.status(422).send({
            message: 'Send your input string in a parameter named `input`',
        });
    }

    return res.status(200).send({
        output: slugify(req.query.input || req.body.input),
    });
};
