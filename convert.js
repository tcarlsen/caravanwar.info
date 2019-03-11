const fs = require('fs');

fs.readdir('./', (err, files) => {
  files.forEach(file => {

    if (file.substr(file.length - 4) === 'json') {

      const filename = file.substr(0, file.length - 5);

      fs.readFile(`./${filename}.json`, (err, data) => {
        if (err) throw err;

        const json = JSON.parse(data);
        let markdown = '';

        markdown += '---\r\n';
        markdown += 'layout: building\r\n';
        markdown += `name: ${json.name.value}` + '\r\n';
        // markdown += `rarity: ${json.rarity.value}` + '\r\n';
        // markdown += `avatar: ${json.avatar.value}` + '\r\n';
        markdown += `image: ${json.artwork.value}` + '\r\n';
        // markdown += `health_points: ${json.health_points.value}` + '\r\n';
        // markdown += `damage: ${json.damage.value}` + '\r\n';
        // markdown += `unlocks_at: ${json.unlocks ? json.unlocks.value : ''}` + '\r\n';
        // markdown += `armor: ${json.armor.value}` + '\r\n';
        // markdown += `armor_piercing: ${json.armor_piercing.value}` + '\r\n';
        // markdown += `attack_speed: ${json.attack_speed.value}` + '\r\n';
        // markdown += `attack_range: ${json.attack_range.value}` + '\r\n';
        // markdown += `move_speed: ${json.move_speed.value}` + '\r\n';
        // markdown += `target_ground: ${json.target_ground.value}` + '\r\n';
        // markdown += `target_air: ${json.target_air.value}` + '\r\n';
        // markdown += `flying: ${json.flying.value}` + '\r\n';
        // markdown += `army_points: ${json.army_points.value}` + '\r\n'; //bandits only

        markdown += '---\r\n';
        markdown += '\r\n';

        if(json.upgarde_effect) {
          markdown += '## Upgrade Effect:\r\n';
          markdown += '\r\n';
          markdown += json.upgarde_effect.value + '\r\n';
        }

        if(json.abilities) {
          markdown += '## Abilities:\r\n';
          markdown += '\r\n';


          json.abilities.value.forEach(ability => {
            markdown += `**${ability.value.name.value}**` + '\r\n';
            markdown += '\r\n';
            markdown += `${ability.value.description.value}` + '\r\n';
            markdown += '\r\n';
          });
        }

        markdown += '## Description:\r\n';
        markdown += '\r\n';
        markdown += json.description.value;

        fs.writeFile(`./${filename}.md`, markdown, 'utf8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });

        fs.unlink(`./${filename}.json`, (err) => {
          if (err) throw err;
          console.log('successfully deleted');
        });

      });

    }

  });
})
